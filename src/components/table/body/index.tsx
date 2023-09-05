import Row from "components/table/row";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { BodyProps } from "types";

const Body = <T extends object>(props: BodyProps<T>) => {
  return (
    <tbody
      className={coalesce(
        props.overrideClasses?.root,
        sc(props.classes?.root, "am_table__body am_table__body--root")
      )}
    >
      {props.data.map((row, rowIndex) => (
        <Row
          idProperty={props.idProperty}
          key={rowIndex}
          {...props.rowProps}
          cellProps={props.cellProps}
          row={{ ...row, index: rowIndex }}
          columns={props.columns}
        />
      ))}
    </tbody>
  );
};

export default Body;
