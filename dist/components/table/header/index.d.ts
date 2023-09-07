import { TableProps } from "types";
import React from "react";
declare const HeaderComponent: <T extends object>(props: TableProps<T>) => React.ReactElement;
declare const Header: typeof HeaderComponent;
export default Header;
