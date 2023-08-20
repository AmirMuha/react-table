import React from "react";
import { TableColumn } from "components/table";

interface HeaderProps {
  columns: TableColumn[];
  onSort: (columnAccessor: string) => void;
  sortedColumn: string | null;
  sortDirection: "asc" | "desc";
  onFilterChange: (columnAccessor: string, value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSort,
  columns,
  sortedColumn,
  sortDirection,
  onFilterChange,
}) => {
  return (
    <thead>
      <tr>
        {columns.map((column, columnIndex) => (
          <th
            key={columnIndex}
            className="header-cell"
            onClick={() => onSort(column.accessor)}
          >
            {column.header}
            <div className="filter-input">
              <input
                type="text"
                value={""} // Use the corresponding filter value from state
                onChange={(e) =>
                  onFilterChange(column.accessor, e.target.value)
                }
                placeholder="Filter"
              />
            </div>
            {sortedColumn === column.accessor && (
              <span className="sort-icon">
                {sortDirection === "asc" ? "↑" : "↓"}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
