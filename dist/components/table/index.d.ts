import { TableProps } from "types";
declare const Table: <T extends object>({ defaultSortedColumn, defaultSortDirection, ...props }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
