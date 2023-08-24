import React, { useState } from "react";
import Cell from "components/table/cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { RowProps, TableRow } from "types";

const Row = <T extends object>(props: RowProps<T>) => {
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

  const handleRowClick = () => {
    if (props.onRowClick) props.onRowClick(props.row);
  };
  return (
    <tr
      className={coalesce(
        props.overrideClasses?.root,
        sc(props.classes?.root, "am_table__body--row am_table__body__row--root")
      )}
      onClick={handleRowClick}
    >
      {props.selection ? (
        <td>
          <input
            type="checkbox"
            checked={isRowSelected(props.row.index)}
            onChange={() => toggleRowSelection(props.row.index)}
          />
        </td>
      ) : null}
      {props.columns.map((column, columnIndex) => (
        <Cell
          key={columnIndex}
          {...props.cellProps}
          row={props.row}
          column={column}
          value={(props.row as any)[column.name]}
        />
      ))}
    </tr>
  );
};

export default Row;
