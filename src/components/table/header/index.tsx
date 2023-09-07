import { useAtom } from "jotai";
import { TableProps } from "types";
import React, { memo } from "react";
import sc from "common/helper/sc";
import coalesce from "common/helper/coalesce";
import HeaderCell from "./cell";

const HeaderComponent = <T extends object>(props: TableProps<T>): React.ReactElement => {
  const [columns] = useAtom(props.atom.columns);
  const [headerRootClass] = useAtom(props.atom.classes.header.classes.root);
  const [headerRootOverrideClass] = useAtom(props.atom.classes.header.overrideClasses.root);
  const [headerRowRootClass] = useAtom(props.atom.classes.headerRow.classes.root);
  const [headerRowRootOverrideClass] = useAtom(props.atom.classes.headerRow.overrideClasses.root);

  return (
    <thead className={coalesce(headerRootOverrideClass, sc(headerRootClass, "am_table__header am_table__header--root"))}>
      <tr className={coalesce(headerRowRootOverrideClass, sc(headerRowRootClass, "am_table__header--row am_table__header__row--root"))}>
        {columns.map((column, columnIndex) => (
          <HeaderCell key={`header_cell_${columnIndex}`} column={column as any} atom={props.atom as any} index={columnIndex} />
        ))}
      </tr>
    </thead>
  );
};

const areEqual = () => true;
const Header: typeof HeaderComponent = memo(HeaderComponent, areEqual) as any;
export default Header;
