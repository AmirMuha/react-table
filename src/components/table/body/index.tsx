import Row, { RowClasses } from "components/table/row";
import { TableCellProps, TableColumn, TableRowProps } from "components/table";
import { CellClasses } from "../cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";

export type BodyClasses = {
  root?: string;
  cell?: CellClasses;
  row?: RowClasses;
};
interface BodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  cellProps?: TableCellProps<T>;
  rowProps?: TableRowProps<T>;
  classes?: BodyClasses;
  overrideClasses?: BodyClasses;
}

const Body = <T extends object>(props: BodyProps<T>) => {
  return (
    <tbody
      className={coalesce(
        props.overrideClasses?.root,
        sc(props.classes?.root, "am_table__body am_table__body--root")
      )}
    >
      {props.data.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          {...props.cellProps}
          row={{ ...row, index: rowIndex }}
          columns={props.columns}
        />
      ))}
    </tbody>
  );
};

export default Body;
