import "./date.css";
import React, { memo } from "react";
import { atom, useAtom } from "jotai";
import { Column, Row } from "types";

export interface DateInputProps<T> {
  value: Date | string;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
  cellRef: React.RefObject<HTMLTableCellElement>;
}

function DateInputComponent<T>(props: DateInputProps<T>): React.ReactElement {
  const row = props.row;
  const [column] = useAtom(props.column);
  const render = column.editable?.type === 'date'?column.editable.render:undefined;
  const onChange = column.editable?.type === 'date'?column.editable.onChange:undefined;

  const handleSubmitDate = (date?: Date) => {
    if(onChange && date) {
      onChange({column, row,value: date});
      props.onFinish();
    }
  };
  return (
    <div className="am_input--date am_input__date--root">
      {render?render(row,column,handleSubmitDate) : null}
    </div>
  );
}

const areEqual = <T = unknown,>(p: DateInputProps<T>, c: DateInputProps<T>) => p.value === c.value;
const DateInput: typeof DateInputComponent = memo(DateInputComponent, areEqual) as any;
export default DateInput;
