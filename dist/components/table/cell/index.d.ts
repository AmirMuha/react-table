import { TableColumn } from "components/table";
import { TableRow } from "components/table/row";
import { EditableCellInfo } from "../header/cell/editable-cell";
export type CellProps<T> = {
    value: any;
    row: TableRow<T>;
    column: TableColumn<T>;
    onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
};
declare const Cell: <T extends object>(props: CellProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Cell;
