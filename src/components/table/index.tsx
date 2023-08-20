import React, { useState } from "react";
import Header from "components/table/header";
import Body from "components/table/body";
import { TableRow } from "./row";

export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  width?: number;
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
  defaultSortedColumn?: string | null;
  defaultSortDirection?: "asc" | "desc";
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  defaultSortedColumn = null,
  defaultSortDirection = "asc",
  itemsPerPage,
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
    return Object.keys(filters).every((column) => {
      const filterValue = filters[column].toLowerCase();
      return row[column].toLowerCase().includes(filterValue);
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
        <Body columns={columns} data={paginatedData} />
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
