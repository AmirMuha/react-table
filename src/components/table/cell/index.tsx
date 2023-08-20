import { TableColumn } from "components/table";
import { TableRow } from "components/table/row";

interface CellProps<T> {
  value: any;
  row: TableRow<T>;
  column: TableColumn<T>;
}

const Cell = <T extends Record<string, any>>(props: CellProps<T>) => {
  return (
    <td className="cell">
      {props.column.render ? props.column.render(props) : props.value}
    </td>
  );
};

export default Cell;
