import "./text.css";
import { atom, useAtom } from "jotai";
import React, { memo, useState } from "react";
import { Cell, Column, Row } from "types";

export interface TextInputProps<T> {
  value: string;
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

function TextInputComponent<T>(props: TextInputProps<T>): React.ReactElement {
  const [column] = useAtom(props.column);
  const [row] = useAtom(props.row);
  const [inputValue, setInputValue] = useState<string>(props.value);

  const onChange = column.editable?.onChange;
  const info: Cell<T> = { value: inputValue, column, row };
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value ?? "");
  const handleSubmit = () => {
    if (onChange) onChange(info);
    props.onFinish();
  };
  const handleBlur = () => handleSubmit();
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "NumpadEnter"].includes(e.code)) handleSubmit();
  };
  return (
    <div className="am_input--text am_input__text--root">
      <input type="text" onChange={handleChangeInputValue} onBlur={handleBlur} onKeyDown={handleEnter} className="am_input__text--input" value={inputValue} />
    </div>
  );
}

const areEqual = <T = unknown,>(p: TextInputProps<T>, c: TextInputProps<T>) => p.value === c.value;
const TextInput: typeof TextInputComponent = memo(TextInputComponent, areEqual) as any;
export default TextInput;
