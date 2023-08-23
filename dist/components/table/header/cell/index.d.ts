import React from "react";
import { TableColumn } from "components/table";
export type HeaderCellClasses = {
    root?: string;
    resizeHandle?: HeaderCellResizeHandleClasses;
};
export type ResizeInfo = {
    width: number;
};
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
declare const HeaderCell: <T extends object>(props: HeaderCellProps<T>) => import("react/jsx-runtime").JSX.Element;
export type HeaderCellResizeHandleClasses = {
    root?: string;
};
export type ColumnResizeHandleProps<T> = {
    classes?: HeaderCellResizeHandleClasses;
    overrideClasses?: HeaderCellResizeHandleClasses;
};
export default HeaderCell;
