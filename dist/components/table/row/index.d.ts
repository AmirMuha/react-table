import { TableColumn } from "components/table";
import { EditableCellInfo } from "../header/cell/editable-cell";
export type TableRow<T> = {
    index: number;
} & Record<keyof T, any>;
interface RowProps<T> {
    columns: TableColumn<T>[];
    row: TableRow<T>;
    onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
}
declare const Row: <T extends Record<keyof T, any>>(props: RowProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Row;
