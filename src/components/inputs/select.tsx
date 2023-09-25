import "./select.css";
import { atom, useAtom } from "jotai";
import { Cell, Column, Row } from "types";
import React, { memo, RefObject, useEffect, useState } from "react";
import ClickAwayListener from "common/util/click-away-listener";
import sc from "common/helper/sc";

export interface SelectInputProps<T> {
  value: string;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
  cellRef: RefObject<HTMLTableDataCellElement>;
}

function SelectInputComponent<T>(props: SelectInputProps<T>): React.ReactElement | null {
  const row = props.row;
  const [open, setOpen] = useState<boolean>(true);
  const [column] = useAtom(props.column);
  const [inputValue, setInputValue] = useState<string>(props.value);
  const [listOptions, setListOptions] = useState<any[]>([]);

  const {type,options,idProperty,scrollbar,getLabel,renderOption,enabled,onChange} = (column.editable?.type === 'select' ? column.editable:undefined)?? {};
  const info: Cell<T> = { value: inputValue, column, row };
  useEffect(() => {
    if(options) {
      if (Array.isArray(options)) setListOptions(options);
      else if(options.fetch) {
        options.fetch(info);
      }
    }
  }, [info.value]);
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value ?? "");
  const handleSubmit = () => {
    if (onChange) onChange(info);
    props.onFinish();
  };
  const handleBlur = () => handleSubmit();
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", "NumpadEnter"].includes(e.code)) handleSubmit();
  };
  const handleOpenOptionsList = ()=>setOpen(true);
  const handleCloseOptionsList = ()=>setOpen(false);
  const handleFocusInput = () => {
    handleOpenOptionsList();
  };

  let resolvedChild = column.render ? column.render(info) : props.value;
  return (
    <div className="am_input--select am_input__select--root">
      {open && idProperty && renderOption && props.cellRef.current ? (
        <div className="">
          {resolvedChild}
          <ClickAwayListener onClickAway={handleCloseOptionsList}>
            <div 
              style={{
                width: props.cellRef.current?.clientWidth + 2,
                top: props.cellRef.current.offsetTop + props.cellRef.current.clientHeight + 1,
                left: props.cellRef.current.offsetLeft
              }} 
              className={sc("am_input__select--options-wrapper", scrollbar?"am_input__select__options-wrapper--scrollbar":'')}
            >
              <div className="am_input__select__options-wrapper--search-wrapper">
                <div className="am_input__select__options-wrapper--search">
                  <input 
                    type="text" 
                    onChange={handleChangeInputValue} 
                    onBlur={handleBlur} 
                    onKeyDown={handleEnter} 
                    onFocus={handleFocusInput}
                    value={inputValue} 
                    className="am_input__select__options-wrapper__search--input" 
                  />
                  {/* <i className /> */}
                </div>
              </div>
              <ul className="am_input__select--options">
                {listOptions.map((o) => (
                  <li key={o[idProperty]} className="am_input__select__options--item">
                    {renderOption(o)}
                  </li>
                ))}
              </ul>
            </div>
          </ClickAwayListener>
        </div>
      ) : null}
    </div>
  );
}

const areEqual = <T = unknown,>(p: SelectInputProps<T>, c: SelectInputProps<T>) => p.value === c.value;
const SelectInput: typeof SelectInputComponent = memo(SelectInputComponent, areEqual) as any;
export default SelectInput;
