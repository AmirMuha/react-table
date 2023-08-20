import React, { useState } from "react";
import Cell from "components/table/cell";
import { TableColumn } from "components/table";
import { EditableCellInfo } from "../header/cell/editable-cell";

export type TableRow<T> = {
  index: number;
} & Record<keyof T, any>;

interface RowProps<T> {
  columns: TableColumn<T>[];
  row: TableRow<T>;
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
}

const Row = <T extends Record<keyof T, any>>(props: RowProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<TableRow<T>[]>([]);

  const toggleRowSelection = (rowIndex: number) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.some((row) => row.index === rowIndex)) {
        return prevSelectedRows.filter((row) => row.index !== rowIndex);
      } else {
        return [...prevSelectedRows, props.row];
      }
    });
  };

  const isRowSelected = (rowIndex: number) =>
    selectedRows.some((row) => row.index === rowIndex);

  return (
    <tr className="row">
      <td>
        <input
          type="checkbox"
          checked={isRowSelected(props.row.index)}
          onChange={() => toggleRowSelection(props.row.index)}
        />
      </td>
      {props.columns.map((column, columnIndex) => (
        <Cell
          key={columnIndex}
          row={props.row}
          column={column}
          value={props.row[column.accessor]}
          onCellChange={props.onCellChange}
        />
      ))}
    </tr>
  );
};

export default Row;
