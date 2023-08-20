import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';
import { TableColumn as TableColumn$1 } from 'components/table';
import { TableRow as TableRow$1 } from 'components/table/row';

interface EditableCellInfo<T> {
    row: TableRow$1<T>;
    column: TableColumn$1<T>;
}

type TableRow<T> = {
    index: number;
} & Record<keyof T, any>;

interface TableColumn<T> {
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
declare const Table: <T extends Record<keyof T, any>>({ data, columns, defaultSortedColumn, defaultSortDirection, itemsPerPage, onCellChange, }: TableProps<T>) => react_jsx_runtime.JSX.Element;

export { Table as default };
