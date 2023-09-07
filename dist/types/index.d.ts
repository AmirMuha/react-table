import { createAtoms } from "components/util/atoms";
import { createStore } from "jotai";
export declare namespace Classes {
    type Cell = {
        root?: string;
    };
    type Row = {
        root?: string;
    };
    type Header = {
        root?: string;
    };
    type HeaderCellResizeHandle = {
        root?: string;
    };
    type HeaderCellSortBtn = {
        root?: string;
    };
    type HeaderCellContent = {
        root?: string;
    };
    type HeaderCell = {
        root?: string;
        resizeHandle?: HeaderCellResizeHandle;
        content?: HeaderCellContent;
        sortBtn?: HeaderCellSortBtn;
    };
    type HeaderRow = {
        root?: string;
    };
    type Container = {
        root?: string;
    };
    type Wrapper = {
        root?: string;
    };
    type Table = {
        root?: string;
    };
    type Footer = {
        root?: string;
    };
    type Body = {
        root?: string;
    };
    type Pagination = {
        root?: string;
    };
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
export type ColumnResize = {
    width: number;
};
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
    editable?: boolean;
    indexing?: {
        enabled: boolean;
        label: string;
    };
    selection?: boolean;
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
    onChange: (info: EditableCell<T>, value: any) => void;
}
export type UpdateCellCallback<T> = (row: Row<T>) => void;
export type CellOptions<T> = {
    editable?: boolean;
    selection?: boolean;
    onClick?: (info: Cell<T>, updateCell?: UpdateCellCallback<T>) => void;
    onChange?: (info: EditableCell<T>, value: any) => void;
};
export interface Column<T> {
    header: string;
    name: keyof T;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    flex?: boolean;
    editable?: boolean;
    filterable?: boolean;
    render?: (info: Cell<T>) => React.ReactNode;
}
export type SortOptions<T> = {
    defaultSortedColumn?: keyof T | null;
    defaultSortDirection?: "asc" | "desc";
};
export type ClassesOptions<T> = {
    body?: {
        classes?: Classes.Body;
        overrideClasses?: Classes.Body;
    };
    row?: {
        classes?: Classes.Row;
        overrideClasses?: Classes.Row;
    };
    cell?: {
        classes?: Classes.Cell;
        overrideClasses?: Classes.Cell;
    };
    header?: {
        classes?: Classes.Header;
        overrideClasses?: Classes.Header;
    };
    headerRow?: {
        classes?: Classes.HeaderRow;
        overrideClasses?: Classes.HeaderRow;
    };
    headerCell?: {
        classes?: Classes.HeaderCell;
        overrideClasses?: Classes.HeaderCell;
    };
    table?: {
        classes?: Classes.Table;
        overrideClasses?: Classes.Table;
    };
    wrapper?: {
        classes?: Classes.Wrapper;
        overrideClasses?: Classes.Wrapper;
    };
    container?: {
        classes?: Classes.Container;
        overrideClasses?: Classes.Container;
    };
    pagination?: {
        classes?: Classes.Pagination;
        overrideClasses?: Classes.Pagination;
    };
};
export type TableOptions<T> = {
    idProperty: string;
    data: T[];
    columns: Column<T>[];
    row?: RowOptions<T>;
    cell?: CellOptions<T>;
    sort?: SortOptions<T>;
    classes?: ClassesOptions<T>;
    header?: HeaderOptions<T>;
    pagination?: PaginationOptions<T>;
    color?: string;
};
export type TableProps<T> = {
    atom: ReturnType<typeof createAtoms<T>>["atom"];
};
