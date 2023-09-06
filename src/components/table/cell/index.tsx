import EditableCell from "components/table/cell/editable-cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { atom, useAtom } from "jotai";
import { Cell as CellType, Column, Row, TableProps } from "types";
import { memo } from "react";

interface CellProps<T> {
  atom: TableProps<T>["atom"];
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  rowIndex: number;
  columnIndex: number;
}

const CellComponent = <T extends object>(props: CellProps<T>) => {
  const [row] = useAtom(props.row);
  const [column] = useAtom(props.column);
  // const [selection] = useAtom(props.atom.cell.selection);
  const [cellRootClass] = useAtom(props.atom.classes.cell.classes.root);
  const [cellRootOverrrideClass] = useAtom(props.atom.classes.cell.overrideClasses.root);
  // const [selected, setSelected] = useAtom(props.atom.cell.selected);
  const value = row[column.name];
  const onCellClick = props.atom.cell.onClick;
  const onCellChange = props.atom.cell.onChange;

  const info: CellType<T> = {
    value,
    row: row,
    column: column,
  };
  let resolvedChild = column.render ? column.render(info) : value;
  const handleCellClick = () => {
    if (onCellClick) onCellClick(info);
  };

  return (
    <td className={coalesce(cellRootOverrrideClass, sc(cellRootClass, "am_table__body--cell am_table__body__cell--root"))} onClick={handleCellClick}>
      {column.editable && onCellChange ? (
        <EditableCell atom={props.atom as any} columnIndex={props.columnIndex} rowIndex={props.rowIndex} column={props.column as any} row={props.row as any} />
      ) : (
        (resolvedChild as any)
      )}
    </td>
  );
};

const areEqual = () => true;
const Cell = memo(CellComponent, areEqual);
export default Cell;
