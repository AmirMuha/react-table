import { TableColumn } from "components/table";
import { EditableCellInfo } from "../header/cell/editable-cell";
export type TableRow<T> = {
    index: number;
} & object;
interface RowProps<T> {
    columns: TableColumn<T>[];
    row: TableRow<T>;
    selection?: boolean;
    onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
}
declare const Row: <T extends object>(props: RowProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Row;
