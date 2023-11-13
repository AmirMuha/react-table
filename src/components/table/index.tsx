import React, { memo } from "react";
import { TableProps } from "types";
import { useAtom } from "jotai";
import sc from "common/helper/sc";
import coalesce from "common/helper/coalesce";
import Body from "components/table/body";
import Header from "components/table/header";
import Pagination from "./pagination";
import useSetupTableEffect from "./setup";
import { useHeaderStickyPosition } from "./hooks";

const TableComponent = <T extends object>({ atom, store }: TableProps<T>): React.ReactElement => {
  const [rtl] = useAtom(atom.rtl);
  const [tableClassesRoot] = useAtom(atom.classes.table.classes.root);
  const [tableOverrideClassesRoot] = useAtom(atom.classes.table.overrideClasses.root);
  const [containerClassesRoot] = useAtom(atom.classes.container.classes.root);
  const [containerOverrideClassesRoot] = useAtom(atom.classes.container.overrideClasses.root);
  const [wrapperClassesRoot] = useAtom(atom.classes.wrapper.classes.root);
  const [wrapperOverrideClassesRoot] = useAtom(atom.classes.wrapper.overrideClasses.root);
  const [paginationEnabled] = useAtom(atom.pagination.enabled);

  useSetupTableEffect({ atom, store });
  const wrapperRef = useHeaderStickyPosition();

  return (
    <div className={coalesce(containerOverrideClassesRoot, sc(containerClassesRoot, "am_table__container", rtl ? "am_rtl" : ""))}>
      <div ref={wrapperRef} className={coalesce(wrapperOverrideClassesRoot, sc(wrapperClassesRoot, "am_table__wrapper"))}>
        <table className={coalesce(tableOverrideClassesRoot, sc(tableClassesRoot, "am_table__table"))}>
          <Header atom={atom} store={store} />
          <Body atom={atom} store={store} />
        </table>
      </div>
      {paginationEnabled ? <Pagination atom={atom} store={store} /> : null}
    </div>
  );
};

const areEqual = () => true;
const Table: typeof TableComponent = memo(TableComponent, areEqual) as any;
export default Table;
