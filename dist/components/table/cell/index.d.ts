import { atom } from "jotai";
import { Column, Row, TableProps } from "types";
import React from "react";
interface CellProps<T> {
    atom: TableProps<T>["atom"];
    row: ReturnType<typeof atom<Row<T>>>;
    column: ReturnType<typeof atom<Column<T>>>;
    rowIndex: number;
    columnIndex: number;
}
declare const CellComponent: <T extends object>(props: CellProps<T>) => React.ReactElement;
declare const Cell: typeof CellComponent;
export default Cell;
