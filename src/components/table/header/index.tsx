import React, { memo } from "react";
import { useAtom } from "jotai";
import { TableProps } from "types";
import sc from "common/helper/sc";
import coalesce from "common/helper/coalesce";
import HeaderCell from "./cell";
import useSetupHeader from "./setup";
import { Checkbox } from "components/inputs/checkbox";

const HeaderComponent = <T extends object>(props: TableProps<T>): React.ReactElement => {
  const [data] = useAtom(props.atom.data);
  const [idProperty] = useAtom(props.atom.idProperty);
  const [indexingLabel] = useAtom(props.atom.row.indexing.label);
  const [indexingEnabled] = useAtom(props.atom.row.indexing.enabled);
  const [headerRootClass] = useAtom(props.atom.classes.header.classes.root);
  const [headerRootOverrideClass] = useAtom(props.atom.classes.header.overrideClasses.root);
  const [headerRowRootClass] = useAtom(props.atom.classes.headerRow.classes.root);
  const [headerRowRootOverrideClass] = useAtom(props.atom.classes.headerRow.overrideClasses.root);
  const [headerCellRootClass] = useAtom(props.atom.classes.headerCell.classes.root);
  const [headerCellRootOverrideClass] = useAtom(props.atom.classes.headerCell.overrideClasses.root);
  const [rowSelection] = useAtom(props.atom.row.selection);
  const [selectedRows, setSelectedRows] = useAtom(props.atom.row.selected);

  const { columns } = useSetupHeader(props.atom);

  const hasCheckedAll = Object.keys(selectedRows).length === data.length;
  const handleCheckAll = () => {
    if (!hasCheckedAll) {
      const selectedRowsCopy = Object.assign({}, selectedRows);
      (data as any[]).forEach((item) => (selectedRowsCopy[item[idProperty]] = item));
      setSelectedRows(selectedRowsCopy);
    } else setSelectedRows({});
  };

  return (
    <thead className={coalesce(headerRootOverrideClass, sc(headerRootClass, "am_table__header am_table__header--root"))}>
      <tr className={coalesce(headerRowRootOverrideClass, sc(headerRowRootClass, "am_table__header--row am_table__header__row--root"))}>
        {rowSelection ? (
          <th
            className={coalesce(
              headerCellRootOverrideClass,
              sc(headerCellRootClass, "am_table__header--cell am_table__header__cell--root am_table__header__cell--checkbox")
            )}
          >
            <div className="am_table__header__cell__checkbox--root">
              <Checkbox checked={hasCheckedAll} onChange={handleCheckAll} />
            </div>
          </th>
        ) : null}
        {indexingEnabled ? (
          <th
            className={coalesce(
              headerCellRootOverrideClass,
              sc(headerCellRootClass, "am_table__header--cell am_table__header__cell--root am_table__header__cell--row-number")
            )}
          >
            <div className="am_table__header__cell__row-number--root">{indexingLabel}</div>
          </th>
        ) : null}
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
