import { Column, Row, TableProps } from "types";
import { atom } from "jotai";
import React from "react";
interface CheckboxProps<T> {
    atom: TableProps<T>["atom"];
    checked: boolean;
    onChange: () => void;
}
declare const CheckboxComponent: <T = unknown>(props: CheckboxProps<T>) => React.ReactElement;
interface CheckboxInputProps<T> {
    value: boolean;
    row: ReturnType<typeof atom<Row<T>>>;
    column: ReturnType<typeof atom<Column<T>>>;
    onFinish: () => void;
}
declare const CheckboxInputComponent: <T = unknown>(props: CheckboxInputProps<T>) => React.ReactElement;
export declare const Checkbox: typeof CheckboxComponent;
declare const CheckboxInput: typeof CheckboxInputComponent;
export default CheckboxInput;
