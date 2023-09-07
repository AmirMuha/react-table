import React from "react";
import { Column, TableProps } from "types";
import { atom } from "jotai";
interface HeaderCellProps<T> {
    atom: TableProps<T>["atom"];
    column: ReturnType<typeof atom<Column<T>>>;
    index: number;
}
declare const HeaderCellComponent: <T extends object>(props: HeaderCellProps<T>) => React.ReactElement;
declare const HeaderCell: typeof HeaderCellComponent;
export default HeaderCell;
