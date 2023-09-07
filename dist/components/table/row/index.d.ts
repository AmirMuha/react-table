import React from "react";
import { atom } from "jotai";
import { Row as RowType, TableProps } from "types";
interface RowProps<T> {
    atom: TableProps<T>["atom"];
    row: ReturnType<typeof atom<RowType<T>>> | T;
    index: number;
}
declare const RowComponent: <T extends object>(props: RowProps<T>) => React.ReactElement;
declare const Row: typeof RowComponent;
export default Row;
