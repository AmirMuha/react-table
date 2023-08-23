import { TableColumn } from "components/table";
import { TableRow } from "components/table/row";
import { EditableCellInfo } from "../header/cell/editable-cell";
export type CellClasses = {
    root?: string;
};
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
declare const Cell: <T extends object>(props: CellProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Cell;
