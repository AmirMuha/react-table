import { RowClasses } from "components/table/row";
import { TableCellProps, TableColumn, TableRowProps } from "components/table";
import { CellClasses } from "../cell";
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
declare const Body: <T extends object>(props: BodyProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Body;
