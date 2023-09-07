import React from "react";
import { TableProps } from "types";
declare const PaginationComponent: <T = unknown>(props: TableProps<T>) => React.ReactElement;
declare const Pagination: typeof PaginationComponent;
export default Pagination;
