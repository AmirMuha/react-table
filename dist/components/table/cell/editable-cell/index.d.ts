import { atom } from "jotai";
import React from "react";
import { Column, Row, TableProps } from "types";
interface EditableCellProps<T> {
    atom: TableProps<T>["atom"];
    row: ReturnType<typeof atom<Row<T>>>;
    column: ReturnType<typeof atom<Column<T>>>;
    rowIndex: number;
    columnIndex: number;
}
declare const EditableCellComponent: <T extends object>(props: EditableCellProps<T>) => React.ReactElement;
declare const EditableCell: typeof EditableCellComponent;
export default EditableCell;
