import "./number.css";
import { atom, useAtom } from "jotai";
import React, { memo, useState } from "react";
import { Cell, Column, Row } from "types";

export interface NumberInputProps<T> {
  value: number;
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

function NumberInputComponent<T>(props: NumberInputProps<T>): React.ReactElement {
  const [column] = useAtom(props.column);
  const [row] = useAtom(props.row);
  const [inputValue, setInputValue] = useState<number>(props.value);

  const onChange = column.editable?.onChange;
  const info: Cell<T> = { value: inputValue, column, row };
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setInputValue(Number(e.target.value));
  };
  const handleSubmit = () => {
    if (onChange) onChange(info);
    props.onFinish();
  };
  const handleBlur = () => handleSubmit();
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "NumpadEnter"].includes(e.code)) handleSubmit();
  };
  return (
    <div className="am_input--number am_input__number--root">
      <input
        type="number"
        onChange={handleChangeInputValue}
        onBlur={handleBlur}
        onKeyDown={handleEnter}
        className="am_input__number--input"
        value={inputValue}
      />
    </div>
  );
}

const areEqual = <T = unknown,>(p: NumberInputProps<T>, c: NumberInputProps<T>) => p.value === c.value;
const NumberInput: typeof NumberInputComponent = memo(NumberInputComponent, areEqual) as any;
export default NumberInput;
