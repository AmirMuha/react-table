import { atom } from "jotai";
import React, { memo } from "react";
import { Column, Row } from "types";

interface SelectInputProps<T> {
  value: any;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

function SelectInputComponent<T>(props: SelectInputProps<T>): React.ReactElement {
  return (
    <div>
      <div></div>
    </div>
  );
}

const areEqual = <T = unknown,>(p: SelectInputProps<T>, c: SelectInputProps<T>) => p.value === c.value;
const SelectInput: typeof SelectInputComponent = memo(SelectInputComponent, areEqual) as any;
export default SelectInput;
