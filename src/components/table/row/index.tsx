import React, { memo, useMemo } from "react";
import Cell from "components/table/cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { atom, useAtom } from "jotai";
import { Row as RowType, TableProps } from "types";

interface RowProps<T> {
  atom: TableProps<T>["atom"];
  row: ReturnType<typeof atom<RowType<T>>> | T;
  index: number;
}

const RowComponent = <T extends object>(props: RowProps<T>) => {
  const [columns] = useAtom(props.atom.columns);
  const [selection] = useAtom(props.atom.row.selection);
  const [rowEditable] = useAtom(props.atom.row.editable);
  const [rowRootClass] = useAtom(props.atom.classes.row.classes.root);
  const [rowRootOverrideClass] = useAtom(props.atom.classes.row.overrideClasses.root);
  const resolvedRowAtom = useMemo(() => (rowEditable ? (props.row as any) : atom(props.row)), [rowEditable]);
  const [row, setRow] = useAtom<Record<string, any>>(resolvedRowAtom);
  const [idProperty] = useAtom(props.atom.idProperty);
  const [selected, setSelected] = useAtom(props.atom.row.selected);

  const id: string = row[idProperty];
  const isRowSelected = selection && !!selected[id];
  const onRowClick = props.atom.row.onClick;

  const toggleRowSelection = () => {
    if (selection) {
      const selectedCopy: any = Object.assign({}, selected);
      if (!isRowSelected) selectedCopy[id] = props.row;
      else delete selectedCopy[id];
      setSelected(selectedCopy);
    }
  };

  const handleRowClick = () => {
    if (onRowClick) onRowClick(row as any);
    if (selection) toggleRowSelection();
  };
  return (
    <tr
      className={coalesce(
        rowRootOverrideClass,
        sc(
          rowRootClass,
          selection ? "am_table__body__row--selectable" : undefined,
          isRowSelected ? "am_table__body__row--selected" : undefined,
          "am_table__body--row am_table__body__row--root"
        )
      )}
      onClick={handleRowClick}
    >
      {selection ? (
        <td>
          <input type="checkbox" checked={isRowSelected} onChange={toggleRowSelection} />
        </td>
      ) : null}
      {columns.map((column, columnIndex) => (
        <Cell
          key={`body_row_cell_${columnIndex}`}
          atom={props.atom as any}
          row={atom(row as any)}
          column={column as any}
          columnIndex={columnIndex}
          rowIndex={props.index}
        />
      ))}
    </tr>
  );
};

const areEqual = () => true;
const Row = memo(RowComponent, areEqual);
export default Row;
