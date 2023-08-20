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

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (columnAccessor: string) => {
    if (sortedColumn === columnAccessor) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnAccessor);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <table className="table">
        <Header
          columns={columns}
          onSort={handleSort}
          sortedColumn={sortedColumn}
          sortDirection={sortDirection}
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
