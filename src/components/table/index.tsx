import React, { useState } from "react";
import Header from "components/table/header";
import Body from "components/table/body";
import { TableRow } from "./row";
import { EditableCellInfo } from "./header/cell/editable-cell";

export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  width?: number;
  editable?: boolean;
  render: (info: {
    row: TableRow<T>;
    column: TableColumn<T>;
    value: any;
  }) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  itemsPerPage: number;
  defaultSortedColumn?: keyof T | null;
  defaultSortDirection?: "asc" | "desc";
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
}

const Table = <T extends Record<keyof T, any>>({
  data,
  columns,
  defaultSortedColumn = null,
  defaultSortDirection = "asc",
  itemsPerPage,
  onCellChange,
}: TableProps<T>) => {
  const [sortedColumn, setSortedColumn] = useState<keyof T | null>(
    defaultSortedColumn
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<keyof T, string> | null>(null);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSort = (columnAccessor: keyof T) => {
    if (sortedColumn === columnAccessor) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnAccessor);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (columnAccessor: keyof T, value: string) => {
    setFilters(
      (prevFilters) =>
        ({
          ...(prevFilters ?? {}),
          [columnAccessor]: value,
        } as any)
    );
  };

  const filteredData = data.filter((row) => {
    if (!filters) return false;
    return Object.keys(filters).every((column: string) => {
      const filterValue = (filters as any)[column].toLowerCase();
      return (row as any)[column].toLowerCase().includes(filterValue);
    });
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <table className="table">
        <Header
          columns={columns}
          onSort={handleSort}
          sortedColumn={sortedColumn}
          sortDirection={sortDirection}
          onFilterChange={handleFilterChange}
        />
        <Body
          data={paginatedData}
          columns={columns}
          onCellChange={onCellChange}
        />
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
