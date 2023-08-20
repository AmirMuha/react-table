import React, { useState } from "react";
import ResizableHeaderCell from "./resizable-cell";
import { TableColumn } from "components/table";

interface HeaderProps<T> {
  columns: TableColumn<T>[];
  onSort: (columnAccessor: keyof T) => void;
  sortedColumn: keyof T | null;
  sortDirection: "asc" | "desc";
  onFilterChange: (columnAccessor: keyof T, value: any) => void;
}

const Header = <T extends Record<string, any>>(props: HeaderProps<T>) => {
  const [columns, setColumns] = useState<TableColumn<T>[]>([]);
  const onResize = (columnIndex: number, newWidth: number) => {
    setColumns((prevColumns: TableColumn<T>[]) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[columnIndex].width = newWidth;
      return updatedColumns;
    });
  };

  return (
    <thead>
      <tr>
        {columns.map((column, columnIndex) => (
          <ResizableHeaderCell
            key={column.header}
            width={column.width}
            onResize={(e, { size }) => onResize(columnIndex, size.width)}
            onClick={() => props.onSort(column.accessor)}
          >
            {column.header}
            <div className="filter-input">
              <input
                type="text"
                value={""} // Use the corresponding filter value from state
                onChange={(e) =>
                  props.onFilterChange(column.accessor, e.target.value)
                }
                placeholder="Filter"
              />
            </div>
            {props.sortedColumn === column.accessor && (
              <span className="sort-icon">
                {props.sortDirection === "asc" ? "↑" : "↓"}
              </span>
            )}
          </ResizableHeaderCell>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
