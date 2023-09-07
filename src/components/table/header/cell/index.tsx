import React, { memo, useEffect } from "react";
import sc from "common/helper/sc";
import coalesce from "common/helper/coalesce";
import sort from "common/helper/sort";
import { Column, TableProps } from "types";
import { atom, useAtom } from "jotai";

interface HeaderCellProps<T> {
  atom: TableProps<T>["atom"];
  column: ReturnType<typeof atom<Column<T>>>;
  index: number;
}

const HeaderCellComponent = <T extends object>(props: HeaderCellProps<T>) => {
  const { classes, overrideClasses } = useClasses(props);
  const [data, setData] = useAtom(props.atom.data);
  const [column, setColumn] = useAtom(props.column);
  const [sortedColumn, setSortedColumn] = useAtom(props.atom.sort.defaultSortedColumn);
  const [sortDirection, setSortDirection] = useAtom(props.atom.sort.defaultSortDirection);

  const onCellClick = props.atom.header.cell.onClick;
  const handleSort = () => {
    if (sortedColumn === column.name) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column.name);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    if (sortDirection && sortedColumn) {
      setData(sort<any>(data, sortedColumn, sortDirection));
    }
  }, [sortDirection, sortedColumn]);

  const handleCellClick = () => {
    handleSort();
    if (onCellClick) onCellClick(column, setColumn);
  };

  return (
    <th
      style={{
        width: column.flex ? "100% !important" : column.width,
        minWidth: column.width ? column.width : column.minWidth,
        maxWidth: column.width ? column.width : column.maxWidth,
      }}
      onClick={handleCellClick}
      className={coalesce(overrideClasses.root, sc(classes.root, "am_table__header--cell am_table__header__cell--root"))}
    >
      <div className={coalesce(overrideClasses.content, sc(classes.content, "am_table__header__cell--content"))}>
        <span>{column.header}</span>
        {sortedColumn === column.name && (
          <div className={coalesce(overrideClasses.sortBtn, sc(classes.sortBtn, "am_table__header__cell--sort-btn"))}>
            <span>{sortDirection === "asc" ? <i className="ti ti-arrow-narrow-up" /> : <i className="ti ti-arrow-narrow-down" />}</span>
          </div>
        )}
      </div>
      {column.filterable ? (
        <>
          {/*
          <div className="filter-input">
            <input type="text" onChange={(e) => onFilterChange(column.name, e.target.value)} placeholder="جستجو" />
          </div>
        */}
        </>
      ) : null}
      <ResizeHandle {...props} />
    </th>
  );
};

function ResizeHandle<T extends object>(props: HeaderCellProps<T>) {
  const [resizeHandleRootClass] = useAtom(props.atom.classes.headerCell.classes.resizeHandle.root);
  const [resizeHandleRootOverrideClass] = useAtom(props.atom.classes.headerCell.overrideClasses.resizeHandle.root);
  const handleDragStart = (e: React.DragEvent<HTMLSpanElement>) => {
    console.log(e);
  };
  return (
    <span
      onDrag={handleDragStart}
      className={coalesce(
        resizeHandleRootOverrideClass,
        sc(resizeHandleRootClass, "am_table__header__cell--resize-handle am_table__header__cell__resize-handle--root")
      )}
    ></span>
  );
}

function useClasses<T>(props: HeaderCellProps<T>) {
  const [headerCellRootClass] = useAtom(props.atom.classes.headerCell.classes.root);
  const [headerCellRootOverrideClass] = useAtom(props.atom.classes.headerCell.overrideClasses.root);
  const [headerCellContentClass] = useAtom(props.atom.classes.headerCell.classes.content.root);
  const [headerCellContentOverrideClass] = useAtom(props.atom.classes.headerCell.overrideClasses.content.root);
  const [headerCellSortBtnClass] = useAtom(props.atom.classes.headerCell.classes.sortBtn.root);
  const [headerCellSortBtnOverrideClass] = useAtom(props.atom.classes.headerCell.overrideClasses.sortBtn.root);
  return {
    classes: { root: headerCellRootClass, content: headerCellContentClass, sortBtn: headerCellSortBtnClass },
    overrideClasses: { root: headerCellRootOverrideClass, content: headerCellContentOverrideClass, sortBtn: headerCellSortBtnOverrideClass },
  };
}

const areEqual = () => true;
const HeaderCell = memo(HeaderCellComponent, areEqual);
export default HeaderCell;
