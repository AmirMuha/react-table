import React from "react";
import { TableProps } from "types";
declare const TableComponent: <T extends object>({ atom }: TableProps<T>) => React.ReactElement;
declare const Table: typeof TableComponent;
export default Table;
