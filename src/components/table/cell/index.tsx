import EditableCell from "components/table/cell/editable-cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { atom, useAtom } from "jotai";
import { Cell as CellType, Column, Row, Store, TableProps } from "types";
import React, { memo, useState } from "react";
import ContextMenu from "./context-menu";

interface CellProps<T> {
  store: Store;
  atom: TableProps<T>["atom"];
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  rowIndex: number;
  columnIndex: number;
}

const CellComponent = <T extends object>(props: CellProps<T>): React.ReactElement => {
  const row = props.row;
  const [column] = useAtom(props.column);
  const [contextMenuOptions] = useAtom(props.atom.cell.contextMenu);
  // const [selection] = useAtom(props.atom.cell.selection);
  const [contextMenu, setContextMenu] = useState<{open: boolean,event?: React.MouseEvent<HTMLTableDataCellElement>}>({open: false});
  const [cellRootClass] = useAtom(props.atom.classes.cell.classes.root);
  const [cellRootOverrrideClass] = useAtom(props.atom.classes.cell.overrideClasses.root);
  // const [selected, setSelected] = useAtom(props.atom.cell.selected);
  const value = row[column.name];
  const onCellClick = props.atom.cell.onClick;

  const isContextMenuEnabled = column.contextMenu?.enabled ?? contextMenuOptions?.enabled;
  const renderContextMenu = isContextMenuEnabled ?  column.contextMenu?.render ?? contextMenuOptions?.render:undefined;
  const info: CellType<T> = { value, row: row, column: column };
  let resolvedChild = column.render ? column.render(info) : value;
  const handleCellClick = () => {
    if (onCellClick) onCellClick(info);
  };
  const handleOpenContextMenu = (e: React.MouseEvent<HTMLTableDataCellElement>)=> {
    e.preventDefault();
    setContextMenu({open:true,event:e});
  }
  const handleCloseContextMenu = ()=>void setContextMenu({open:false});

  return (
    <td
      style={{
        width: column.flex ? "100% !important" : column.width ?? "fit-content",
        minWidth: column.width ? column.width : column.minWidth,
        maxWidth: column.width ? column.width : column.maxWidth,
      }}
      className={coalesce(cellRootOverrrideClass, sc(cellRootClass, "am_table__body--cell am_table__body__cell--root"))}
      onClick={handleCellClick}
      onContextMenu={handleOpenContextMenu}
    >
      {isContextMenuEnabled && renderContextMenu && contextMenu.event && renderContextMenu ? <ContextMenu onClose={handleCloseContextMenu} contextMenuEvent={contextMenu.event} atom={props.atom} column={props.column} row={props.row} store={props.store} >{renderContextMenu(info)}</ContextMenu> : null}
      {column.editable?.enabled ? (
        <EditableCell atom={props.atom} columnIndex={props.columnIndex} rowIndex={props.rowIndex} column={props.column} row={props.row} store={props.store} />
      ) : (
        (resolvedChild as any)
      )}
    </td>
  );
};

const areEqual = <T = unknown>(p:CellProps<T>,c: CellProps<T>) => {
  return p.row[p.store.get(p.column).name] === c.row[c.store.get(c.column).name];
};
const Cell: typeof CellComponent = memo(CellComponent, areEqual) as any;
export default Cell;
