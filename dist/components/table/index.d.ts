import React from "react";
import { TableRow } from "./row";
import { EditableCellInfo } from "./header/cell/editable-cell";
export interface TableColumn<T> {
    header: string;
    name: keyof T;
    width?: number;
    editable?: boolean;
    filterable?: boolean;
    render?: (info: {
        row: TableRow<T>;
        column: TableColumn<T>;
        value: any;
    }) => React.ReactNode;
}
type TableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    selection?: boolean;
    pagination?: boolean;
    itemsPerPage?: number;
    onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
    defaultSortedColumn?: keyof T | null;
    defaultSortDirection?: "asc" | "desc";
};
declare const Table: <T extends object>({ data, columns, selection, pagination, defaultSortedColumn, defaultSortDirection, itemsPerPage, onCellChange, }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
