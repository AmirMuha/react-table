import React from "react";
import HeaderCell from "components/table/header/cell";
import { Resizable, ResizeCallbackData } from "react-resizable";

interface ResizableHeaderCellProps {
  width?: number;
  onClick: () => void;
  onResize: (e: any, info: ResizeCallbackData) => void;
}

const ResizableHeaderCell: React.FC<
  React.PropsWithChildren<ResizableHeaderCellProps>
> = (props) => {
  if (!props.width) {
    return <HeaderCell>{props.children}</HeaderCell>;
  }

  return (
    <Resizable width={props.width} height={0} onResize={props.onResize}>
      <HeaderCell children={props.children} />
    </Resizable>
  );
};

export default ResizableHeaderCell;
