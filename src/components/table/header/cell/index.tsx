import React from "react";
import sc from "common/helper/sc";
import coalesce from "common/helper/coalesce";
import { ColumnResizeHandleProps, HeaderCellProps } from "types";

const HeaderCell = <T extends object>(props: HeaderCellProps<T>) => {
  const handleCellClick = () => {
    if (props.onCellClick) props.onCellClick(props.column);
  };
  return (
    <th
      style={{
        width: props.column.flex ? "100% !important" : props.column.width,
        minWidth: props.column.width
          ? props.column.width
          : props.column.minWidth,
        maxWidth: props.column.width
          ? props.column.width
          : props.column.maxWidth,
      }}
      onClick={handleCellClick}
      className={coalesce(
        props.overrideClasses?.root,
        sc(
          props.classes?.root,
          "am_table__header--cell am_table__header__cell--root"
        )
      )}
    >
      {props.children}
      <ResizeHandle
        classes={props.classes?.resizeHandle}
        overrideClasses={props.overrideClasses?.resizeHandle}
      ></ResizeHandle>
    </th>
  );
};

function ResizeHandle<T extends object>(props: ColumnResizeHandleProps<T>) {
  const handleDragStart = (e: React.DragEvent<HTMLSpanElement>) => {
    console.log(e);
  };
  return (
    <span
      onDrag={handleDragStart}
      className={coalesce(
        props.overrideClasses?.root,
        sc(
          props.classes?.root,
          "am_table__header__cell--resize-handle am_table__header__cell__resize-handle--root"
        )
      )}
    ></span>
  );
}

export default HeaderCell;
