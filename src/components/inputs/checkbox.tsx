import sc from "common/helper/sc";
import { Column, Row, TableProps } from "types";
import { atom } from "jotai";
import React, { memo } from "react";

interface CheckboxProps<T> {
  atom: TableProps<T>["atom"];
  checked: boolean;
  onChange: () => void;
}

const CheckboxComponent = <T = unknown,>(props: CheckboxProps<T>): React.ReactElement => {
  return (
    <div onClick={props.onChange} className={sc("am_input--checkbox am_input__checkbox--root", props.checked ? "am_input__checkbox--checked" : "")}>
      <div className="am_input__checkbox--check">
        <div className="am_input__checkbox__check--inner"></div>
      </div>
    </div>
  );
};

interface CheckboxInputProps<T> {
  value: boolean;
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

const CheckboxInputComponent = <T = unknown,>(props: CheckboxInputProps<T>): React.ReactElement => {
  return (
    <div>
      <div></div>
    </div>
  );
};

const areEqual = <T = unknown,>(p: CheckboxProps<T>, c: CheckboxProps<T>) => p.checked === c.checked;
export const Checkbox: typeof CheckboxComponent = memo(CheckboxComponent, areEqual) as any;
const areInputPropsEqual = <T = unknown,>(p: CheckboxInputProps<T>, c: CheckboxInputProps<T>) => p.value === c.value;
const CheckboxInput: typeof CheckboxInputComponent = memo(CheckboxInputComponent, areInputPropsEqual) as any;
export default CheckboxInput;
