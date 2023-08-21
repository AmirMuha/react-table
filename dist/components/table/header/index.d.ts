import { TableColumn } from "components/table";
interface HeaderProps<T> {
    columns: TableColumn<T>[];
    onSort: (columnAccessor: keyof T) => void;
    sortedColumn: keyof T | null;
    sortDirection: "asc" | "desc";
    onFilterChange: (columnAccessor: keyof T, value: any) => void;
}
declare const Header: <T extends object>(props: HeaderProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Header;
