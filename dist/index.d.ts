import * as react_jsx_runtime from "react/jsx-runtime";
import React from "react";
import { TableColumn as TableColumn$1 } from "components/table";
import { TableRow as TableRow$1 } from "components/table/row";

export interface EditableCellInfo<T> {
  row: TableRow$1<T>;
  column: TableColumn$1<T>;
}

export type TableRow<T> = {
  index: number;
} & object;

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
export type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  selection?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
  defaultSortedColumn?: keyof T | null;
  defaultSortDirection?: "asc" | "desc";
};
declare const Table: <T extends object>({
  data,
  columns,
  selection,
  pagination,
  defaultSortedColumn,
  defaultSortDirection,
  itemsPerPage,
  onCellChange,
}: TableProps<T>) => react_jsx_runtime.JSX.Element;

export { Table as AmirMuhaTable };
