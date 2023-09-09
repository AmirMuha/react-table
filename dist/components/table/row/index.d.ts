import React from "react";
import { TableProps } from "types";
interface RowProps<T> {
    atom: TableProps<T>["atom"];
    row: T;
    index: number;
}
declare const RowComponent: <T extends object>(props: RowProps<T>) => React.ReactElement;
declare const Row: typeof RowComponent;
export default Row;
