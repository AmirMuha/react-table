import React from "react";

interface HeaderCellProps {}

const HeaderCell: React.FC<React.PropsWithChildren<HeaderCellProps>> = ({
  children,
}) => {
  return <th>{children}</th>;
};

export default HeaderCell;
