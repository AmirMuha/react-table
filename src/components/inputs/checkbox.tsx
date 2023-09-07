import sc from "common/helper/sc";
import { TableProps } from "types";
import React, { memo } from "react";

interface CheckboxProps<T> {
  atom: TableProps<T>["atom"];
  checked: boolean;
  onChange: () => void;
}

const CheckboxComponent = <T = unknown,>(props: CheckboxProps<T>): React.ReactElement => {
  return (
    <div onClick={props.onChange} className={sc("am_input--checkbox am_input__checkbox--root", props.checked ? "am_input__checkbox--checked" : "")}>
      <div className="am_input__checkbox--check">
        <div className="am_input__checkbox__check--inner"></div>
      </div>
    </div>
  );
};

const areEqual = <T = unknown,>(p: CheckboxProps<T>, c: CheckboxProps<T>) => p.checked === c.checked;
const Checkbox: typeof CheckboxComponent = memo(CheckboxComponent, areEqual) as any;
export default Checkbox;
