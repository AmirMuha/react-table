import { atom } from "jotai";
import React, { memo } from "react";
import { Column, Row } from "types";

interface DateInputProps<T> {
  value: Date | string;
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

function DateInputComponent<T>(props: DateInputProps<T>): React.ReactElement {
  return (
    <div>
      <div></div>
    </div>
  );
}

const areEqual = <T = unknown,>(p: DateInputProps<T>, c: DateInputProps<T>) => p.value === c.value;
const DateInput: typeof DateInputComponent = memo(DateInputComponent, areEqual) as any;
export default DateInput;
