import EditableCell from "components/table/cell/editable-cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { atom, useAtom } from "jotai";
import { Cell as CellType, Column, Row, TableProps } from "types";
import React, { memo } from "react";

interface CellProps<T> {
  atom: TableProps<T>["atom"];
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  rowIndex: number;
  columnIndex: number;
}

const CellComponent = <T extends object>(props: CellProps<T>): React.ReactElement => {
  const [row] = useAtom(props.row);
  const [column] = useAtom(props.column);
  // const [selection] = useAtom(props.atom.cell.selection);
  const [cellRootClass] = useAtom(props.atom.classes.cell.classes.root);
  const [cellRootOverrrideClass] = useAtom(props.atom.classes.cell.overrideClasses.root);
  // const [selected, setSelected] = useAtom(props.atom.cell.selected);
  const value = row[column.name];
  const onCellClick = props.atom.cell.onClick;

  const info: CellType<T> = { value, row: row, column: column };
  let resolvedChild = column.render ? column.render(info) : value;
  const handleCellClick = () => {
    if (onCellClick) onCellClick(info);
  };

  return (
    <td
      style={{
        width: column.flex ? "100% !important" : column.width ?? "fit-content",
        minWidth: column.width ? column.width : column.minWidth,
        maxWidth: column.width ? column.width : column.maxWidth,
      }}
      className={coalesce(cellRootOverrrideClass, sc(cellRootClass, "am_table__body--cell am_table__body__cell--root"))}
      onClick={handleCellClick}
    >
      {column.editable?.enabled ? (
        <EditableCell atom={props.atom} columnIndex={props.columnIndex} rowIndex={props.rowIndex} column={props.column} row={props.row} />
      ) : (
        (resolvedChild as any)
      )}
    </td>
  );
};

const areEqual = () => true;
const Cell: typeof CellComponent = memo(CellComponent, areEqual) as any;
export default Cell;
