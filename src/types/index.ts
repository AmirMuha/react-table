import React from "react";
import createAtoms, {Store} from "components/util/atoms";
import { createStore } from "jotai";

export * from "../components/inputs/checkbox";
export * from "../components/inputs/number";
export * from "../components/inputs/money";
export * from "../components/inputs/text";
export * from "../components/inputs/date";
export * from "../components/inputs/select";
export * from "../components/table/provider";
export * from "../components/table/setup";
export * from "../components/util/atoms";
export * from "../components/table/body";
export * from "../components/table/cell";
export * from "../components/table/cell/editable-cell";
export * from "../components/table/header";
export * from "../components/table/header/cell";
export * from "../components/table/row";
export * from "../components/table/pagination";
export * from "../components/table/footer";

export namespace Classes {
  export type Cell = { root?: string };
  export type Row = { root?: string };
  export type Header = { root?: string };
  export type HeaderCellResizeHandle = { root?: string };
  export type HeaderCellSortBtn = { root?: string };
  export type HeaderCellContent = { root?: string };
  export type HeaderCell = { root?: string; resizeHandle?: HeaderCellResizeHandle; content?: HeaderCellContent; sortBtn?: HeaderCellSortBtn };
  export type HeaderRow = { root?: string };
  export type Container = { root?: string };
  export type Wrapper = { root?: string };
  export type Table = { root?: string };
  export type Footer = { root?: string };
  export type Body = { root?: string };
  export type Pagination = { root?: string };
}

export interface HeaderOptions<T> {
  selection?: boolean;
  onSort: (columnAccessor: keyof T) => void;
  cell: HeaderCellOptions<T>;
}

export type ProviderProps = {
  store: ReturnType<typeof createStore>;
};
export type Row<T> = {
  index: number;
} & T;

export type ColumnResize = { width: number };
export type HeaderCell<T> = Column<T>;
export interface EditableCell<T> {
  row: Row<T>;
  column: Column<T>;
}
export type Cell<T> = {
  value: any;
  row: Row<T>;
  column: Column<T>;
};

export type UpdateRowCallback<T> = (row: Row<T>) => void;
export interface RowOptions<T> {
  indexing?: {
    enabled: boolean;
    label: string;
  };
  selection?: {
    enabled: boolean;
    /** @default true */
    checkbox?: boolean;
    /** @default true */
    multiple?: boolean;
    /** @default false */
    onlyCheckboxSelect?: boolean;
    onSelect?: (row: Row<T>) => any;
    onUnselect?: (row: Row<T>) => Promise<boolean> | boolean;
  } | boolean;
  onClick?: (info: Row<T>, updateRow?: UpdateRowCallback<T>) => void;
  classes?: Classes.Row;
  overrideClasses?: Classes.Row;
}

export type PaginationOptions<T> = {
  enabled: boolean;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
};

export type UpdateHeaderCellCallback<T> = (row: HeaderCell<T>) => void;
export interface HeaderCellOptions<T> {
  width?: number;
  onClick?: (info: HeaderCell<T>, updateHeaderCell?: UpdateHeaderCellCallback<T>) => void;
  onResize?: (e: any, info: ColumnResize) => void;
}

export interface EditableCellOptions<T> {
  value: any;
  row: Row<T>;
  column: Column<T>;
}

export type ContextMenuOptions<T> = {
}
export type UpdateCellCallback<T> = (row: Row<T>) => void;
export type CellOptions<T> = {
  selection?: boolean;
  contextMenu?: {
    enabled: boolean;
    render: (info: Cell<T>) => React.ReactElement;
  };
  onClick?: (info: Cell<T>, updateCell?: UpdateCellCallback<T>) => void;
};

export type EditableCellType = "select" | "text" | "number" | "checkbox" | "date" | "money";
export type EditableCellOption<T> = { enabled: boolean; type: EditableCellType; onChange: (info: Cell<T>) => void };
export type EditableCellAutoFetchOptionsFn<T> = <Option>(info: Cell<T>) => Option[];
export interface EditableCellMoneyOptions<T> extends EditableCellOption<T> {
  type: "money";
  enabled: boolean;
}
export interface EditableCellTextOptions<T> extends EditableCellOption<T> {
  type: "text";
  enabled: boolean;
}
export interface EditableCellCheckboxOptions<T> extends EditableCellOption<T> {
  type: "checkbox";
  enabled: boolean;
}
export interface EditableCellDateOptions<T> extends EditableCellOption<T> {
  type: "date";
  enabled: boolean;
}
export interface EditableCellNumberOptions<T> extends EditableCellOption<T> {
  type: "number";
  enabled: boolean;
}
export interface EditableCellSelectOptions<T, Option = unknown> extends EditableCellOption<T> {
  type: "select";
  enabled: boolean;
  idProperty: string,
  renderOption: <Option>(option: Option) => React.ReactNode;
  getLabel: <Option>(option: Option) => string;
  scrollbar?: boolean;
  options: {
    fetch: EditableCellAutoFetchOptionsFn<T>;
  } | Option[];
}

export interface Column<T> {
  header: string;
  name: keyof T;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  flex?: boolean;
  contextMenu?: {
    enabled: boolean;
    render: (info: Cell<T>) => React.ReactElement;
  };
  editable?:
    | EditableCellTextOptions<T>
    | EditableCellMoneyOptions<T>
    | EditableCellNumberOptions<T>
    | EditableCellCheckboxOptions<T>
    | EditableCellDateOptions<T>
    | EditableCellSelectOptions<T>;
  filterable?: boolean;
  render?: (info: Cell<T>) => React.ReactNode;
}

export type SortOptions<T> = {
  defaultSortedColumn?: keyof T | null;
  defaultSortDirection?: "asc" | "desc";
};

export type ClassesOptions<T> = {
  body?: { classes?: Classes.Body; overrideClasses?: Classes.Body };
  row?: { classes?: Classes.Row; overrideClasses?: Classes.Row };
  cell?: { classes?: Classes.Cell; overrideClasses?: Classes.Cell };
  header?: { classes?: Classes.Header; overrideClasses?: Classes.Header };
  headerRow?: { classes?: Classes.HeaderRow; overrideClasses?: Classes.HeaderRow };
  headerCell?: { classes?: Classes.HeaderCell; overrideClasses?: Classes.HeaderCell };
  table?: { classes?: Classes.Table; overrideClasses?: Classes.Table };
  wrapper?: { classes?: Classes.Wrapper; overrideClasses?: Classes.Wrapper };
  container?: { classes?: Classes.Container; overrideClasses?: Classes.Container };
  pagination?: { classes?: Classes.Pagination; overrideClasses?: Classes.Pagination };
};

export type TableOptions<T> = {
  idProperty: string;
  data?: T[];
  columns: Column<T>[];
  row?: RowOptions<T>;
  cell?: CellOptions<T>;
  sort?: SortOptions<T>;
  classes?: ClassesOptions<T>;
  header?: HeaderOptions<T>;
  pagination?: PaginationOptions<T>;
  color?: string;
  rtl?: boolean;
};

export type TableProps<T> = {
  atom: ReturnType<typeof createAtoms<T>>["atom"];
  store: Store;
};
