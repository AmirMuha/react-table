import "./date.css";
import React, { memo, useState } from "react";
import { atom, useAtom } from "jotai";
import { Cell, Column, Row } from "types";

export interface DateInputProps<T> {
  value: Date | string;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
  cellRef: React.RefObject<HTMLTableDataCellElement>;
}

function DateInputComponent<T>(props: DateInputProps<T>): React.ReactElement {
  const row = props.row;
  const [column] = useAtom(props.column);

  return (
    <React.Fragment>
      <div className="am_input--date am_input__date--root">
      </div>
    </React.Fragment>
  );
}

const areEqual = <T = unknown,>(p: DateInputProps<T>, c: DateInputProps<T>) => p.value === c.value;
const DateInput: typeof DateInputComponent = memo(DateInputComponent, areEqual) as any;
export default DateInput;
