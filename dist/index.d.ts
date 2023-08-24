export { default as AmirMuhaTable } from 'components/table';

type RowClasses = {
    root?: string;
    cell?: {
        root?: string;
    };
};
type TableRow<T> = {
    index: number;
} & object;
interface RowProps<T> {
    row: TableRow<T>;
    columns: TableColumn<T>[];
    selection?: boolean;
    onRowClick?: (info: TableRow<T>) => void;
    cellProps?: TableCellProps<T>;
    classes?: RowClasses;
    overrideClasses?: RowClasses;
}
type PaginationProps = {
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
};
type HeaderClasses = {
    root?: string;
    cell?: HeaderCellClasses;
    row?: RowClasses;
};
interface HeaderProps<T> {
    columns: TableColumn<T>[];
    onSort: (columnAccessor: keyof T) => void;
    sortedColumn: keyof T | null;
    sortDirection: "asc" | "desc";
    onFilterChange: (columnAccessor: keyof T, value: any) => void;
    classes?: HeaderClasses;
    overrideClasses?: HeaderClasses;
}
type HeaderCellResizeHandleClasses = {
    root?: string;
};
type ColumnResizeHandleProps<T> = {
    classes?: HeaderCellResizeHandleClasses;
    overrideClasses?: HeaderCellResizeHandleClasses;
};
type HeaderCellClasses = {
    root?: string;
    resizeHandle?: HeaderCellResizeHandleClasses;
};
type ResizeInfo = {
    width: number;
};
type HeaderCellInfo<T> = TableColumn<T>;
interface HeaderCellProps<T> {
    width?: number;
    onClick: () => void;
    onResize: (e: any, info: ResizeInfo) => void;
    column: TableColumn<T>;
    onCellClick?: (info: HeaderCellInfo<T>) => void;
    classes?: HeaderCellClasses;
    overrideClasses?: HeaderCellClasses;
    children?: React.ReactNode;
}
interface EditableCellInfo<T> {
    row: TableRow<T>;
    column: TableColumn<T>;
}
interface EditableCellProps<T> {
    value: any;
    row: TableRow<T>;
    column: TableColumn<T>;
    onChange: (info: EditableCellInfo<T>, value: any) => void;
}
type FooterClasses = {
    root?: string;
    cell?: CellClasses;
    row?: RowClasses;
};
type CellClasses = {
    root?: string;
};
type CellInfo<T> = {
    value: any;
    row: TableRow<T>;
    column: TableColumn<T>;
};
type CellProps<T> = {
    value: any;
    row: TableRow<T>;
    column: TableColumn<T>;
    selection?: boolean;
    onCellClick?: (info: CellInfo<T>) => void;
    onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
    classes?: CellClasses;
    overrideClasses?: CellClasses;
};
type BodyClasses = {
    root?: string;
    cell?: CellClasses;
    row?: RowClasses;
};
interface BodyProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    cellProps?: TableCellProps<T>;
    rowProps?: TableRowProps<T>;
    classes?: BodyClasses;
    overrideClasses?: BodyClasses;
}
type ContainerClasses = {
    root?: string;
    wrapper?: WrapperClasses;
};
type WrapperClasses = {
    root?: string;
    table?: TableClasses;
};
type TableClasses = {
    root?: string;
    header?: HeaderClasses;
    footer?: FooterClasses;
    body?: BodyClasses;
};
interface TableColumn<T> {
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
type TableCellProps<T> = Omit<CellProps<T>, "value" | "row" | "column">;
type TableRowProps<T> = Omit<RowProps<T>, "row" | "columns">;
type TableProps<T> = {
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

export type { BodyClasses, BodyProps, CellClasses, CellInfo, CellProps, ColumnResizeHandleProps, ContainerClasses, EditableCellInfo, EditableCellProps, FooterClasses, HeaderCellClasses, HeaderCellInfo, HeaderCellProps, HeaderCellResizeHandleClasses, HeaderClasses, HeaderProps, PaginationProps, ResizeInfo, RowClasses, RowProps, TableCellProps, TableClasses, TableColumn, TableProps, TableRow, TableRowProps, WrapperClasses };
