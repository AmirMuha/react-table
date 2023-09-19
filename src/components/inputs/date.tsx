import "./date.css";
import React, { memo, useState } from "react";
import { atom, useAtom } from "jotai";
import { Cell, Column, Row } from "types";

export interface DateInputProps<T> {
  value: Date | string;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
  cellRef: React.MutableRefObject<HTMLTableDataCellElement | null>;
}

function DateInputComponent<T>(props: DateInputProps<T>): React.ReactElement {
  const row = props.row;
  const [isPickerOpen , setIsPickerOpen] = useState<boolean>(false);
  const [column] = useAtom(props.column);
  const [inputValue, setInputValue] = useState<string>(typeof props.value  === 'string' ? props.value : toDateString(props.value));

  const shouldValidate = column.editable?.type === 'date' ? column.editable?.validate: true;
  const translate = column.editable?.type === 'date' ? column.editable?.picker?.translate: undefined;
  const hasPickerEnabled = column.editable?.type === 'date' ? column.editable?.picker?.enabled: undefined;
  const render = column.editable?.type === 'date' ? column.editable?.picker?.render: undefined;
  const onChange = column.editable?.onChange;
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const resolvedDate = resolveDateString(e.target.value ?? "");
    setInputValue(resolvedDate);
  };
  const info: Cell<T> = { value: shouldValidate && isInvalidDate(inputValue) ? translate ? translate(inputValue):toDate(inputValue): props.value, column, row };
  const handleSubmit = () => {
    if (onChange) onChange(info);
    props.onFinish();
  };
  const handleBlur = () => handleSubmit();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "NumpadEnter"].includes(e.code)) handleSubmit();
    if (e.code === 'Backspace') setInputValue(del(inputValue));
  };
  return (
    <React.Fragment>
      {isPickerOpen && render && onChange && hasPickerEnabled ? (
        <div className="am_input__date--picker">
          {render(info, onChange)}
        </div>
      ):null}
      <div className="am_input--date am_input__date--root">
        <input type="text" onChange={handleChangeInputValue} onBlur={handleBlur} onKeyDown={handleKeyDown} className="am_input__date--input" value={inputValue} />
      </div>
    </React.Fragment>
  );
}

function del(input: string): string {
  let result: string;
  const numbers = input.replace(/\D*/g,'');
  const numbersArr = numbers.split('')
  numbersArr.splice(numbersArr.length - 1, 1);
  result = resolveDateString(numbersArr.join(""));
  return result;
};

function isInvalidDate (date: string): boolean {
  return date === 'Invalid Date';
}

function isDateStringValid (date: string): boolean {
  const [month,day,year] = date.split('/');
  return !!month && !!day && !!year;
}

function toDateString (date: Date): string {
  const [month,day,year] = date.toLocaleDateString().split('/');
  return `${year}/${month}/${day}`;
}

function toDate (date: string): Date {
  const [month,day,year] = date.split('/');
  return new Date(+year,+month- 1,+day);
}

function resolveDateString(value:string): string {
  const placeholder = '----/--/--';
  if (value) {
    const numbers = value.replace(/\D*/g,'');
    const numbersLength = numbers.length;
    if (numbersLength === 0) return placeholder;
    if (numbersLength === 1)  return `${numbers[0]}---/--/--`
    else if (numbersLength === 2)  return `${numbers[0]}${numbers[1]}--/--/--`
    else if (numbersLength === 3)  return `${numbers[0]}${numbers[1]}${numbers[2]}-/--/--`
    else if (numbersLength === 4)  return `${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}/--/--`
    else if (numbersLength === 5)  return `${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}/${numbers[4]}-/--`
    else if (numbersLength === 6)  return `${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}/${numbers[4]}${numbers[5]}/--`
    else if (numbersLength === 7)  return `${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}/${numbers[4]}${numbers[5]}/${numbers[6]}-`
    else if (numbersLength === 8)  return `${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}/${numbers[4]}${numbers[5]}/${numbers[6]}${numbers[7]}`
    else return `${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}/${numbers[4]}${numbers[5]}/${numbers[6]}${numbers[7]}`;
  } else return placeholder;
};

const areEqual = <T = unknown,>(p: DateInputProps<T>, c: DateInputProps<T>) => p.value === c.value;
const DateInput: typeof DateInputComponent = memo(DateInputComponent, areEqual) as any;
export default DateInput;
