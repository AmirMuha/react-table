import { TableColumn } from "components/table";
import { TableRow } from "components/table/row";
export interface EditableCellInfo<T> {
    row: TableRow<T>;
    column: TableColumn<T>;
}
interface EditableCellProps<T> {
    value: any;
    row: TableRow<T>;
    column: TableColumn<T>;
    onChange: (info: EditableCellInfo<T>, value: any) => void;
}
declare const EditableCell: <T extends object>({ value, onChange, row, column, }: EditableCellProps<T>) => import("react/jsx-runtime").JSX.Element;
export default EditableCell;
