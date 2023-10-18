import "./select.css";
import sc from "common/helper/sc";
import React, { memo, RefObject, useCallback, useEffect, useState } from "react";
import ClickAwayListener from "common/util/click-away-listener";
import { atom, useAtom } from "jotai";
import { Cell, Column, Row } from "types";
import { createPortal } from "react-dom";

interface SelectInputProps<T> {
  value: any;
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  onFinish: () => void;
}

function SelectInputComponent<T>(props: SelectInputProps<T>): React.ReactElement | null {
  const row = props.row;
  const [open, setOpen] = useState<boolean>(true);
  const [column] = useAtom(props.column);
  const [inputValue, setInputValue] = useState<string>('');
  const [listOptions, setListOptions] = useState<any[]>([]);

  const {options,idProperty,scrollbar,getLabel,renderOption,enabled,onChange} = (column.editable?.type === 'select' ? column.editable:undefined)?? {};
  const info: Cell<T> = { value: inputValue, column, row };
  const resolveOptions = useCallback((inf: Cell<T>) => {
    if(options) {
      if (Array.isArray(options)) setListOptions(options);
      else if(options.fetch) options.fetch(info).then(o => setListOptions(o));
    }
  },[]);
  const searchHandler = useCallback((v: string) => {
    if(v) {
      if(getLabel) {
        const filteredOptions = listOptions.filter((s) => new RegExp(v,'i').test(getLabel(s)));
        setListOptions(filteredOptions);
      }
    } else resolveOptions(info);
  },[info.value]);
  useEffect(() => {
    const hideOptionsListener = () => void (open?setOpen(false):undefined);
    window.addEventListener('scroll', hideOptionsListener)
    return () => void window.removeEventListener('scroll', hideOptionsListener);
  }, [open]);
  useEffect(() => void resolveOptions(info), []);
  useEffect(() => void searchHandler(inputValue) , [inputValue]);
  const handleChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value ?? "");
  const handleOpenOptionsList = ()=>setOpen(true);
  const handleCloseOptionsList =()=> {
    setOpen(false);
    props.onFinish();
  };
  const handleFocusInput = () => handleOpenOptionsList();

  const CLIENT_RECT = props.cellRef.current?.getBoundingClientRect();
  const handleSelect = (o: any) => () => {
    if(onChange) {
      onChange(info,o);
      handleCloseOptionsList();
      props.onFinish();
    }
  };
  let resolvedChild = column.render ? column.render(info) : props.value;
  return (
    <div className="am_input--select am_input__select--root">
      {resolvedChild}
      {open && idProperty && renderOption && props.cellRef.current && CLIENT_RECT ? 
        createPortal(
          <div>
            <ClickAwayListener onClickAway={handleCloseOptionsList}>
              <div 
                style={{
                  width: CLIENT_RECT.width + 2,
                  top: CLIENT_RECT.top + CLIENT_RECT.height + 1,
                  left: CLIENT_RECT.left
                }}
                className={sc("am_input__select--options-wrapper", scrollbar?"am_input__select__options-wrapper--scrollbar":'')}
              >
                <div className="am_input__select__options-wrapper--search-wrapper">
                  <div className="am_input__select__options-wrapper--search">
                    <input 
                      type="text" 
                      onChange={handleChangeInputValue} 
                      onFocus={handleFocusInput}
                      value={inputValue} 
                      className="am_input__select__options-wrapper__search--input" 
                    />
                    {/* <i className /> */}
                  </div>
                </div>
                <ul className="am_input__select--options">
                  {listOptions.map((o) => (
                    <li key={o[idProperty]} className="am_input__select__options--item" onClick={handleSelect(o)}>
                      {renderOption(o)}
                    </li>
                  ))}
                </ul>
              </div>
            </ClickAwayListener>
          </div>,
          document.body)
       : null}
    </div>
  );
}

const areEqual = <T = unknown,>(p: SelectInputProps<T>, c: SelectInputProps<T>) => p.value === c.value;
const SelectInput: typeof SelectInputComponent = memo(SelectInputComponent, areEqual) as any;
export default SelectInput;
