import { TableColumn } from "components/table";
import { TableRow } from "components/table/row";
import { useState } from "react";

export interface EditableCellInfo<T> {
  row: TableRow<T>;
  column: TableColumn<T>;
}

interface EditableCellProps<T> {
  value: any;
  row: TableRow<T>;
  column: TableColumn<T>;
  onChange: (info: EditableCellInfo<T>, value: any) => void;
}

const EditableCell = <T extends Record<keyof T, any>>({
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
