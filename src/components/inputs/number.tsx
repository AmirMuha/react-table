import { atom } from "jotai";
import React, { memo } from "react";
import { Column, Row } from "types";

interface NumberInputProps<T> {
  value: number;
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

function NumberInputComponent<T>(props: NumberInputProps<T>): React.ReactElement {
  return (
    <div>
      <div></div>
    </div>
  );
}

const areEqual = <T = unknown,>(p: NumberInputProps<T>, c: NumberInputProps<T>) => p.value === c.value;
const NumberInput: typeof NumberInputComponent = memo(NumberInputComponent, areEqual) as any;
export default NumberInput;
