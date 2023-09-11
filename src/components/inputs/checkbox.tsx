import "./checkbox.css";
import React, { memo, useState } from "react";
import sc from "common/helper/sc";
import ClickAwayListener from "common/util/click-away-listener";
import { Cell, Column, Row } from "types";
import { atom, useAtom } from "jotai";

export interface CheckboxProps<T> {
  checked: boolean;
  onChange: () => void;
  mode?: "rect" | "check";
}

const CheckboxComponent = <T = unknown,>(props: CheckboxProps<T>): React.ReactElement => {
  const mode = props.mode ?? "rect";
  const handleChangeChecked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    props.onChange();
  };
  return (
    <div onClick={handleChangeChecked} className={sc("am_input--checkbox am_input__checkbox--root", props.checked ? "am_input__checkbox--checked" : "")}>
      <div className="am_input__checkbox--check">
        {mode === "rect" ? <div className="am_input__checkbox__check--rect"></div> : null}
        {mode === "check" ? <div className="am_input__checkbox__check--check"></div> : null}
      </div>
    </div>
  );
};

export interface CheckboxInputProps<T> {
  value: boolean;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

const CheckboxInputComponent = <T = unknown,>(props: CheckboxInputProps<T>): React.ReactElement => {
  const row = props.row;
  const [column] = useAtom(props.column);
  const [inputValue, setInputValue] = useState<boolean>(props.value);

  const onChange = column.editable?.onChange;
  const info: Cell<T> = { value: inputValue, column, row };
  const handleChangeInputValue = () => setInputValue(!inputValue);
  const handleSubmit = () => {
    if (onChange) onChange(info);
    props.onFinish();
  };
  const handleBlur = () => handleSubmit();
  return (
    <ClickAwayListener onClickAway={handleBlur}>
      <div className="am_input__checkbox--editable">
        <CheckboxComponent checked={inputValue} onChange={handleChangeInputValue} mode="check" />
      </div>
    </ClickAwayListener>
  );
};

export const Checkbox: typeof CheckboxComponent = memo(CheckboxComponent) as any;
const areInputPropsEqual = <T = unknown,>(p: CheckboxInputProps<T>, c: CheckboxInputProps<T>) => p.value === c.value;
const CheckboxInput: typeof CheckboxInputComponent = memo(CheckboxInputComponent, areInputPropsEqual) as any;
export default CheckboxInput;
