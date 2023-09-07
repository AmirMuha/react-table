import { TableProps } from "types";
import React from "react";
declare const BodyComponent: <T extends object>(props: TableProps<T>) => React.ReactElement;
declare const Body: typeof BodyComponent;
export default Body;
