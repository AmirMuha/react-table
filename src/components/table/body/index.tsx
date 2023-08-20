import React from "react";
import Row from "components/table/row";
import { TableColumn } from "components/table";

interface BodyProps {
  columns: TableColumn[];
  data: any[];
}

const Body: React.FC<BodyProps> = ({ columns, data }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <Row key={rowIndex} columns={columns} row={row} />
      ))}
    </tbody>
  );
};

export default Body;
