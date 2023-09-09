import { TableProps } from "types";
declare const TableComponent: <T extends object>({ atom }: TableProps<T>) => JSX.Element;
declare const Table: typeof TableComponent;
export default Table;
