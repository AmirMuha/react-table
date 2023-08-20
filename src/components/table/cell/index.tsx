import React from "react";

interface CellProps {
  cellData: any;
}

const Cell: React.FC<CellProps> = ({ cellData }) => {
  return <td className="cell">{cellData}</td>;
};

export default Cell;
