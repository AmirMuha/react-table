import React from "react";
import { ResizeCallbackData } from "react-resizable";
interface ResizableHeaderCellProps {
    width?: number;
    onClick: () => void;
    onResize: (e: any, info: ResizeCallbackData) => void;
}
declare const ResizableHeaderCell: React.FC<React.PropsWithChildren<ResizableHeaderCellProps>>;
export default ResizableHeaderCell;
