import React from "react";
import { TableRow } from "./row";
import { EditableCellInfo } from "./header/cell/editable-cell";
export interface TableColumn<T> {
    header: string;
    accessor: keyof T;
    width?: number;
    editable?: boolean;
    render: (info: {
        row: TableRow<T>;
        column: TableColumn<T>;
        value: any;
    }) => React.ReactNode;
}
interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    itemsPerPage: number;
    defaultSortedColumn?: keyof T | null;
    defaultSortDirection?: "asc" | "desc";
    onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
}
declare const Table: <T extends Record<keyof T, any>>({ data, columns, defaultSortedColumn, defaultSortDirection, itemsPerPage, onCellChange, }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
