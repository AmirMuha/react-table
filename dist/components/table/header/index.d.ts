import { TableColumn } from "components/table";
import { RowClasses } from "../row";
import { HeaderCellClasses } from "./cell";
export type HeaderClasses = {
    root?: string;
    cell?: HeaderCellClasses;
    row?: RowClasses;
};
interface HeaderProps<T> {
    columns: TableColumn<T>[];
    onSort: (columnAccessor: keyof T) => void;
    sortedColumn: keyof T | null;
    sortDirection: "asc" | "desc";
    onFilterChange: (columnAccessor: keyof T, value: any) => void;
    classes?: HeaderClasses;
    overrideClasses?: HeaderClasses;
}
declare const Header: <T extends object>(props: HeaderProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Header;
