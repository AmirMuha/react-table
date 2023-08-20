import React from "react";
import { TableColumn } from "components/table";

interface HeaderProps {
  columns: TableColumn[];
  onSort: (columnAccessor: string) => void;
  sortedColumn: string | null;
  sortDirection: "asc" | "desc";
}

const Header: React.FC<HeaderProps> = ({
  columns,
  onSort,
  sortedColumn,
  sortDirection,
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
