import React, { useState } from "react";
import Header from "components/table/header";
import Body from "components/table/body";

export interface TableColumn {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: TableColumn[];
  data: any[];
  defaultSortedColumn?: string;
  defaultSortDirection?: "asc" | "desc";
  itemsPerPage: number;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  defaultSortedColumn = null,
  defaultSortDirection = "asc",
  itemsPerPage,
}) => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(
    defaultSortedColumn
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSort = (columnAccessor: string) => {
    if (sortedColumn === columnAccessor) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnAccessor);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = (columnAccessor: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnAccessor]: value,
    }));
  };

  const filteredData = data.filter((row) => {
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
