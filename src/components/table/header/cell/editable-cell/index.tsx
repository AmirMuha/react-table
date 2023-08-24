import { useState } from "react";
import { EditableCellProps } from "types";

const EditableCell = <T extends object>({
  value,
  onChange,
  row,
  column,
}: EditableCellProps<T>) => {
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleBlur = () => {
    onChange({ row, column }, currentValue);
    setEditing(false);
  };

  return editing ? (
    <input
      type="text"
      value={currentValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  ) : (
    <div onDoubleClick={handleDoubleClick}>{value}</div>
  );
};

export default EditableCell;
