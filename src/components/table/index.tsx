import React, { useState } from "react";
import Header from "components/table/header";
import Body from "components/table/body";
import { TableRow } from "./row";
import { EditableCellInfo } from "./header/cell/editable-cell";

export interface TableColumn<T> {
  header: string;
  name: keyof T;
  width?: number;
  editable?: boolean;
  filterable?: boolean;
  render?: (info: {
    row: TableRow<T>;
    column: TableColumn<T>;
    value: any;
  }) => React.ReactNode;
}

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  selection?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
  defaultSortedColumn?: keyof T | null;
  defaultSortDirection?: "asc" | "desc";
};

const Table = <T extends object>({
  data,
  columns,
  selection = false,
  pagination = false,
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

  const totalPages =
    itemsPerPage && itemsPerPage !== 0
      ? Math.ceil(data.length / itemsPerPage)
      : 1;

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
    if (!filters) return true;
    return Object.keys(filters).every((column: string) => {
      const filterValue = (filters as any)[column].toLowerCase();
      return (row as any)[column].toLowerCase().includes(filterValue);
    });
  });

  const paginatedData =
    itemsPerPage && itemsPerPage !== 0
      ? filteredData.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : filteredData;

  return (
    <div>
      <div className="table-container">
        <table>
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
            selection={selection}
            onCellChange={onCellChange}
          />
        </table>
      </div>
      {pagination ? (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            قبل
          </button>
          <span>
            صفحه {currentPage} از {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            بعد
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
