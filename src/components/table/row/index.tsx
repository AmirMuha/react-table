import React, { useState } from "react";
import Cell from "components/table/cell";
import { TableColumn } from "components/table";

export type TableRow<T> = {
  index: number;
} & Record<keyof T, any>;

interface RowProps<T> {
  columns: TableColumn<T>[];
  row: TableRow<T>;
}

const Row = <T extends Record<string, any>>(props: RowProps<T>) => {
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
        />
      ))}
    </tr>
  );
};

export default Row;
