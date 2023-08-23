import * as react_jsx_runtime from "react/jsx-runtime";
import React from "react";
import { BodyClasses } from "components/table/body";
import { HeaderClasses } from "components/table/header";
import { CellProps as CellProps$1 } from "components/table/cell";
import { TableColumn as TableColumn$1 } from "components/table";
import { TableRow as TableRow$1 } from "components/table/row";

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
  columns: TableColumn$1<T>[];
  selection?: boolean;
  onRowClick?: (info: TableRow<T>) => void;
  cellProps?: Omit<CellProps$1<T>, "value">;
  classes?: RowClasses;
  overrideClasses?: RowClasses;
}

export interface EditableCellInfo<T> {
  row: TableRow$1<T>;
  column: TableColumn$1<T>;
}

export type CellClasses = {
  root?: string;
};
export type CellInfo<T> = {
  value: any;
  row: TableRow$1<T>;
  column: TableColumn$1<T>;
};
export type CellProps<T> = {
  value: any;
  row: TableRow$1<T>;
  column: TableColumn$1<T>;
  selection?: boolean;
  onCellClick?: (info: CellInfo<T>) => void;
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
  classes?: CellClasses;
  overrideClasses?: CellClasses;
};

export type FooterClasses = {
  root?: string;
  cell?: CellClasses;
  row?: RowClasses;
};

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
  selection?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
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
declare const Table: <T extends object>({
  pagination,
  defaultSortedColumn,
  defaultSortDirection,
  ...props
}: TableProps<T>) => react_jsx_runtime.JSX.Element;

export { Table as AmirMuhaTable };
