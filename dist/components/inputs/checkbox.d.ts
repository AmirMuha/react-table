import { TableProps } from "types";
import React from "react";
interface CheckboxProps<T> {
    atom: TableProps<T>["atom"];
    checked: boolean;
    onChange: () => void;
}
declare const CheckboxComponent: <T = unknown>(props: CheckboxProps<T>) => React.ReactElement;
declare const Checkbox: typeof CheckboxComponent;
export default Checkbox;
