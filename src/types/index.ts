export type RowClasses = { root?: string; cell?: { root?: string } };
export type TableRow<T> = {
  index: number;
} & object;

export interface RowProps<T> {
  row: TableRow<T>;
  columns: TableColumn<T>[];
  selection?: boolean;
  onRowClick?: (info: TableRow<T>) => void;
  cellProps?: TableCellProps<T>;
  classes?: RowClasses;
  overrideClasses?: RowClasses;
}
export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};
export type HeaderClasses = {
  root?: string;
  cell?: HeaderCellClasses;
  row?: RowClasses;
};
export interface HeaderProps<T> {
  columns: TableColumn<T>[];
  onSort: (columnAccessor: keyof T) => void;
  sortedColumn: keyof T | null;
  sortDirection: "asc" | "desc";
  onFilterChange: (columnAccessor: keyof T, value: any) => void;
  classes?: HeaderClasses;
  overrideClasses?: HeaderClasses;
}
export type HeaderCellResizeHandleClasses = { root?: string };
export type ColumnResizeHandleProps<T> = {
  classes?: HeaderCellResizeHandleClasses;
  overrideClasses?: HeaderCellResizeHandleClasses;
};
export type HeaderCellClasses = {
  root?: string;
  resizeHandle?: HeaderCellResizeHandleClasses;
};
export type ResizeInfo = { width: number };
export type HeaderCellInfo<T> = TableColumn<T>;
export interface HeaderCellProps<T> {
  width?: number;
  onClick: () => void;
  onResize: (e: any, info: ResizeInfo) => void;
  column: TableColumn<T>;
  onCellClick?: (info: HeaderCellInfo<T>) => void;
  classes?: HeaderCellClasses;
  overrideClasses?: HeaderCellClasses;
  children?: React.ReactNode;
}
export interface EditableCellInfo<T> {
  row: TableRow<T>;
  column: TableColumn<T>;
}

export interface EditableCellProps<T> {
  value: any;
  row: TableRow<T>;
  column: TableColumn<T>;
  onChange: (info: EditableCellInfo<T>, value: any) => void;
}
export type FooterClasses = {
  root?: string;
  cell?: CellClasses;
  row?: RowClasses;
};
export type CellClasses = { root?: string };
export type CellInfo<T> = {
  value: any;
  row: TableRow<T>;
  column: TableColumn<T>;
};

export type CellProps<T> = {
  value: any;
  row: TableRow<T>;
  column: TableColumn<T>;
  selection?: boolean;
  onCellClick?: (info: CellInfo<T>) => void;
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
  classes?: CellClasses;
  overrideClasses?: CellClasses;
};
export type BodyClasses = {
  root?: string;
  cell?: CellClasses;
  row?: RowClasses;
};
export interface BodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  cellProps?: TableCellProps<T>;
  rowProps?: TableRowProps<T>;
  classes?: BodyClasses;
  overrideClasses?: BodyClasses;
}
export type ContainerClasses = { root?: string; wrapper?: WrapperClasses };
export type WrapperClasses = { root?: string; table?: TableClasses };
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
  classes?: { container?: ContainerClasses };
  overrideClasses?: { container?: ContainerClasses };
};
