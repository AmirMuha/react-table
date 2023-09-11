import CheckboxInput from "components/inputs/checkbox";
import DateInput from "components/inputs/date";
import MoneyInput from "components/inputs/money";
import NumberInput from "components/inputs/number";
import SelectInput from "components/inputs/select";
import TextInput from "components/inputs/text";
import { atom, useAtom } from "jotai";
import React, { memo, useState } from "react";
import { Cell, Column, Row, TableProps } from "types";

export interface EditableCellProps<T> {
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
  const handleDoubleClick = () => {
    setEditing(true);
  };
  const handleCloseEditing = () => setEditing(false);
  const info: Cell<T> = { value, row: row, column: column };
  let resolvedChild = column.render ? column.render(info) : value;
  return editing ? (
    <div className="am_table__body__cell--editable">
      {column.editable?.type === "text" ? <TextInput value={value} column={props.column} row={props.row} onFinish={handleCloseEditing} /> : null}
      {column.editable?.type === "number" ? <NumberInput value={value} column={props.column} row={props.row} onFinish={handleCloseEditing} /> : null}
      {column.editable?.type === "money" ? <MoneyInput value={value} column={props.column} row={props.row} onFinish={handleCloseEditing} /> : null}
      {column.editable?.type === "checkbox" ? <CheckboxInput value={value} column={props.column} row={props.row} onFinish={handleCloseEditing} /> : null}
      {column.editable?.type === "date" ? <DateInput value={value} column={props.column} row={props.row} onFinish={handleCloseEditing} /> : null}
      {column.editable?.type === "select" ? <SelectInput value={value} column={props.column} row={props.row} onFinish={handleCloseEditing} /> : null}
    </div>
  ) : (
    <div className="am_table__body__cell--editable" onDoubleClick={handleDoubleClick}>
      <div className="am_table__body__cell__editable--content">{resolvedChild}</div>
    </div>
  );
};

const areEqual = () => true;
const EditableCell: typeof EditableCellComponent = memo(EditableCellComponent, areEqual) as any;
export default EditableCell;
