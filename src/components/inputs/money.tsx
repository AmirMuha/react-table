import { atom } from "jotai";
import React, { memo } from "react";
import { Column, Row } from "types";

interface MoneyInputProps<T> {
  value: number;
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

function MoneyInputComponent<T>(props: MoneyInputProps<T>): React.ReactElement {
  return (
    <div>
      <div></div>
    </div>
  );
}

const areEqual = <T = unknown,>(p: MoneyInputProps<T>, c: MoneyInputProps<T>) => p.value === c.value;
const MoneyInput: typeof MoneyInputComponent = memo(MoneyInputComponent, areEqual) as any;
export default MoneyInput;
