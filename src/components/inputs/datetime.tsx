import "./datetime.css";
import React, { memo } from "react";
import { atom, useAtom } from "jotai";
import { Column, Row } from "types";

export interface DateTimeInputProps<T> {
  value: Date | string;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
  cellRef: React.RefObject<HTMLTableCellElement>;
}

function DateTimeInputComponent<T>(props: DateTimeInputProps<T>): React.ReactElement {
  const row = props.row;
  const [column] = useAtom(props.column);
  const render = column.editable?.type === 'datetime'?column.editable.render:undefined;
  const onChange = column.editable?.type === 'datetime'?column.editable.onChange:undefined;

  const handleSubmitDateTime = (date?: Date) => {
    if(onChange && date) {
      onChange({column, row,value: date});
      props.onFinish();
    }
  };
  return (
    <div className="am_input--datetime am_input__datetime--root">
      {render?render(row,column,handleSubmitDateTime) : null}
    </div>
  );
}

const areEqual = <T = unknown,>(p: DateTimeInputProps<T>, c: DateTimeInputProps<T>) => p.value === c.value;
const DateTimeInput: typeof DateTimeInputComponent = memo(DateTimeInputComponent, areEqual) as any;
export default DateTimeInput;
