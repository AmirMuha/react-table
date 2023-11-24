import "./time.css";
import React, { memo } from "react";
import { atom, useAtom } from "jotai";
import { Column, Row } from "types";

export interface TimeInputProps<T> {
  value: Date | string;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
  cellRef: React.RefObject<HTMLTableCellElement>;
}

function TimeInputComponent<T>(props: TimeInputProps<T>): React.ReactElement {
  const row = props.row;
  const [column] = useAtom(props.column);
  const render = column.editable?.type === 'time'?column.editable.render:undefined;
  const onChange = column.editable?.type === 'time'?column.editable.onChange:undefined;

    const handleSubmitTime = (time?: Date) => {
    if(onChange && time) {
      onChange({column, row,value: time});
      props.onFinish();
    }
  };
  return (
    <div className="am_input--time am_input__time--root">
      {render?render(row,column,handleSubmitTime) : null}
    </div>
  );
}

const areEqual = <T = unknown,>(p: TimeInputProps<T>, c: TimeInputProps<T>) => p.value === c.value;
const TimeInput: typeof TimeInputComponent = memo(TimeInputComponent, areEqual) as any;
export default TimeInput;
