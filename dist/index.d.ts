import AmirMuhaTable from 'components/table';
import React from 'react';
import createAtoms from 'components/util/atoms';
import { createStore } from 'jotai';
export { default } from 'components/table';
export { default as createAtoms } from 'components/util/atoms';
export { default as TableProvider } from 'components/table/provider';

declare namespace Classes {
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
declare interface HeaderOptions<T> {
    selection?: boolean;
    onSort: (columnAccessor: keyof T) => void;
    cell: HeaderCellOptions<T>;
}
declare type ProviderProps = {
    store: ReturnType<typeof createStore>;
};
declare type Row<T> = {
    index: number;
} & T;
declare type ColumnResize = {
    width: number;
};
declare type HeaderCell<T> = Column<T>;
declare interface EditableCell<T> {
    row: Row<T>;
    column: Column<T>;
}
declare type Cell<T> = {
    value: any;
    row: Row<T>;
    column: Column<T>;
};
declare type UpdateRowCallback<T> = (row: Row<T>) => void;
declare interface RowOptions<T> {
    indexing?: {
        enabled: boolean;
        label: string;
    };
    selection?: boolean;
    onClick?: (info: Row<T>, updateRow?: UpdateRowCallback<T>) => void;
    classes?: Classes.Row;
    overrideClasses?: Classes.Row;
}
declare type PaginationOptions<T> = {
    enabled: boolean;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
};
declare type UpdateHeaderCellCallback<T> = (row: HeaderCell<T>) => void;
declare interface HeaderCellOptions<T> {
    width?: number;
    onClick?: (info: HeaderCell<T>, updateHeaderCell?: UpdateHeaderCellCallback<T>) => void;
    onResize?: (e: any, info: ColumnResize) => void;
}
declare interface EditableCellOptions<T> {
    value: any;
    row: Row<T>;
    column: Column<T>;
}
declare type UpdateCellCallback<T> = (row: Row<T>) => void;
declare type CellOptions<T> = {
    selection?: boolean;
    onClick?: (info: Cell<T>, updateCell?: UpdateCellCallback<T>) => void;
};
declare type EditableCellType = "select" | "text" | "number" | "checkbox" | "date";
declare type EditableCellOption<T> = {
    enabled: boolean;
    type: EditableCellType;
    onChange: (info: Cell<T>) => void;
};
declare type EditableCellAutoFetchOptionsFn<T> = <Option>(info: Cell<T>) => Option[];
declare interface EditableCellTextOptions<T> extends EditableCellOption<T> {
    type: "text";
    enabled: boolean;
}
declare interface EditableCellCheckboxOptions<T> extends EditableCellOption<T> {
    type: "checkbox";
    enabled: boolean;
}
declare interface EditableCellDateOptions<T> extends EditableCellOption<T> {
    type: "date";
    enabled: boolean;
}
declare interface EditableCellNumberOptions<T> extends EditableCellOption<T> {
    type: "number";
    enabled: boolean;
}
declare interface EditableCellSelectOptions<T> extends EditableCellOption<T> {
    type: "select";
    enabled: boolean;
    options: {
        fetch: EditableCellAutoFetchOptionsFn<T>;
        renderOption: <Option>(option: Option) => React.ReactNode;
        getOptionLabel: <Option>(option: Option) => string;
    };
}
declare interface Column<T> {
    header: string;
    name: keyof T;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    flex?: boolean;
    editable?: EditableCellTextOptions<T> | EditableCellNumberOptions<T> | EditableCellCheckboxOptions<T> | EditableCellDateOptions<T> | EditableCellSelectOptions<T>;
    filterable?: boolean;
    render?: (info: Cell<T>) => React.ReactNode;
}
declare type SortOptions<T> = {
    defaultSortedColumn?: keyof T | null;
    defaultSortDirection?: "asc" | "desc";
};
declare type ClassesOptions<T> = {
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
declare type TableOptions<T> = {
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
declare type TableProps<T> = {
    atom: ReturnType<typeof createAtoms<T>>["atom"];
};

export { type Cell, type CellOptions, Classes, type ClassesOptions, type Column, type ColumnResize, type EditableCell, type EditableCellAutoFetchOptionsFn, type EditableCellCheckboxOptions, type EditableCellDateOptions, type EditableCellNumberOptions, type EditableCellOption, type EditableCellOptions, type EditableCellSelectOptions, type EditableCellTextOptions, type EditableCellType, type HeaderCell, type HeaderCellOptions, type HeaderOptions, type PaginationOptions, type ProviderProps, type Row, type RowOptions, type SortOptions, type TableOptions, type TableProps, type UpdateCellCallback, type UpdateHeaderCellCallback, type UpdateRowCallback };
