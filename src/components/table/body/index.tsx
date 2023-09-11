import Row from "components/table/row";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { useAtom } from "jotai";
import { TableProps } from "types";
import React, { memo } from "react";

const BodyComponent = <T extends object>(props: TableProps<T>): React.ReactElement => {
  const [data] = useAtom(props.atom.data);
  const [currentPage] = useAtom(props.atom.pagination.currentPage);
  const [itemsPerPage] = useAtom(props.atom.pagination.itemsPerPage);
  const [bodyRootClass] = useAtom(props.atom.classes.body.classes.root);
  const [bodyRootOverrideClass] = useAtom(props.atom.classes.body.overrideClasses.root);
  const paginatedData = itemsPerPage && itemsPerPage !== 0 ? data.slice(((currentPage ?? 0) - 1) * itemsPerPage, (currentPage ?? 0) * itemsPerPage) : data;

  return (
    <tbody className={coalesce(bodyRootOverrideClass, sc(bodyRootClass, "am_table__body am_table__body--root"))}>
      {paginatedData.map((row, rowIndex) => (
        <Row key={`body_row_${rowIndex}`} index={rowIndex} row={{ ...row, index: rowIndex }} atom={props.atom} store={props.store} />
      ))}
    </tbody>
  );
};

const areEqual = () => true;
const Body: typeof BodyComponent = memo(BodyComponent, areEqual) as any;
export default Body;
