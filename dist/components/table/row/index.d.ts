import { CellProps } from "components/table/cell";
import { TableColumn } from "components/table";
export type RowClasses = {
    root?: string;
    cell?: {
        root?: string;
    };
};
export type TableRow<T> = {
    index: number;
} & object;
export interface RowProps<T> {
    row: TableRow<T>;
    columns: TableColumn<T>[];
    selection?: boolean;
    onRowClick?: (info: TableRow<T>) => void;
    cellProps?: Omit<CellProps<T>, "value">;
    classes?: RowClasses;
    overrideClasses?: RowClasses;
}
declare const Row: <T extends object>(props: RowProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Row;
