import React, { useState } from "react";
import Header from "components/table/header";
import Body from "components/table/body";

export interface TableColumn {
  header: string;
  accessor: string;
}

interface TableProps {
  data: any[];
  columns: TableColumn[];
  defaultSortedColumn?: string;
  defaultSortDirection?: "asc" | "desc";
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  defaultSortedColumn = null,
  defaultSortDirection = "asc",
}) => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(
    defaultSortedColumn
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    defaultSortDirection
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
    <table className="table">
      <Header
        columns={columns}
        onSort={handleSort}
        sortedColumn={sortedColumn}
        sortDirection={sortDirection}
      />
      <Body columns={columns} data={data} />
    </table>
  );
};

export default Table;
