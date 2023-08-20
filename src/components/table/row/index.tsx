import React from "react";
import Cell from "components/table/cell";
import { TableColumn } from "components/table";

interface RowProps {
  columns: TableColumn[];
  row: any;
}

const Row: React.FC<RowProps> = ({ columns, row }) => {
  return (
    <tr className="row">
      {columns.map((column, columnIndex) => (
        <Cell key={columnIndex} cellData={row[column.accessor]} />
      ))}
    </tr>
  );
};

export default Row;
