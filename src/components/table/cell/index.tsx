import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { TableColumn } from "components/table";
import { TableRow } from "components/table/row";
import EditableCell, { EditableCellInfo } from "../header/cell/editable-cell";

export type CellClasses = { root?: string };
export type CellInfo<T> = {
  value: any;
  row: TableRow<T>;
  column: TableColumn<T>;
};

export type CellProps<T> = {
  value: any;
  row: TableRow<T>;
  column: TableColumn<T>;
  selection?: boolean;
  onCellClick?: (info: CellInfo<T>) => void;
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
  classes?: CellClasses;
  overrideClasses?: CellClasses;
};

const Cell = <T extends object>(props: CellProps<T>) => {
  const CELL_INFO: CellInfo<T> = {
    row: props.row,
    value: props.value,
    column: props.column,
  };
  let resolvedChild = props.column.render
    ? props.column.render(CELL_INFO)
    : props.value;
  const handleCellClick = () => {
    if (props.onCellClick) props.onCellClick(CELL_INFO);
  };

  return (
    <td
      className={coalesce(
        props.overrideClasses?.root,
        sc(
          props.classes?.root,
          "am_table__body--cell am_table__body__cell--root"
        )
      )}
      onClick={handleCellClick}
    >
      {props.column.editable && props.onCellChange ? (
        <EditableCell
          value={props.value}
          onChange={props.onCellChange}
          column={props.column}
          row={props.row}
        />
      ) : (
        resolvedChild
      )}
    </td>
  );
};

export default Cell;
