import { atom, useAtom } from "jotai";
import React, { memo, useState } from "react";
import { Column, Row, TableProps } from "types";

interface EditableCellProps<T> {
  atom: TableProps<T>["atom"];
  row: ReturnType<typeof atom<Row<T>>>;
  column: ReturnType<typeof atom<Column<T>>>;
  rowIndex: number;
  columnIndex: number;
}

const EditableCellComponent = <T extends object>(props: EditableCellProps<T>): React.ReactElement => {
  const [column] = useAtom(props.column);
  const [row] = useAtom(props.row);
  const value: any = row[column.name];
  const [editing, setEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const onChange = props.atom.cell.onChange;
  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.target.value);
  };

  const handleBlur = () => {
    if (onChange) onChange({ row, column }, currentValue);
    setEditing(false);
  };

  return editing ? (
    <input type="text" value={currentValue} onChange={handleChange} onBlur={handleBlur} />
  ) : (
    <div onDoubleClick={handleDoubleClick}>{value}</div>
  );
};

const areEqual = () => true;
const EditableCell: typeof EditableCellComponent = memo(EditableCellComponent, areEqual) as any;
export default EditableCell;
