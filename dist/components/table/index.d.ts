import React from "react";
import { BodyClasses } from "components/table/body";
import { HeaderClasses } from "components/table/header";
import { PaginationProps } from "./pagination";
import { RowProps } from "./row";
import { CellInfo, CellProps } from "./cell";
import { FooterClasses } from "./footer";
export type ContainerClasses = {
    root?: string;
    wrapper?: WrapperClasses;
};
export type WrapperClasses = {
    root?: string;
    table?: TableClasses;
};
export type TableClasses = {
    root?: string;
    header?: HeaderClasses;
    footer?: FooterClasses;
    body?: BodyClasses;
};
export interface TableColumn<T> {
    header: string;
    name: keyof T;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    flex?: boolean;
    editable?: boolean;
    filterable?: boolean;
    render?: (info: CellInfo<T>) => React.ReactNode;
}
export type TableCellProps<T> = Omit<CellProps<T>, "value" | "row" | "column">;
export type TableRowProps<T> = Omit<RowProps<T>, "row" | "columns">;
export type TableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    paginationProps?: PaginationProps;
    rowProps?: TableRowProps<T>;
    cellProps?: TableCellProps<T>;
    defaultSortedColumn?: keyof T | null;
    defaultSortDirection?: "asc" | "desc";
    classes?: {
        container?: ContainerClasses;
    };
    overrideClasses?: {
        container?: ContainerClasses;
    };
};
declare const Table: <T extends object>({ defaultSortedColumn, defaultSortDirection, ...props }: TableProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Table;
