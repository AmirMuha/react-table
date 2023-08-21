import { TableColumn } from "components/table";
import { TableRow } from "components/table/row";
import EditableCell, { EditableCellInfo } from "../header/cell/editable-cell";

export type CellProps<T> = {
  value: any;
  row: TableRow<T>;
  column: TableColumn<T>;
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
};

const Cell = <T extends object>(props: CellProps<T>) => {
  let resolvedChild = props.column.render ? props.column.render : props.value;
  return (
    <td className="cell">
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
