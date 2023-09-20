import React from "react";
import ClickAwayListener from "common/util/click-away-listener";
import {atom} from "jotai";
import {createPortal} from "react-dom";
import {Column, Row, Store, TableProps} from "types";

export interface ContextMenuProps<T> {
  store: Store;
  atom: TableProps<T>["atom"];
  row: Row<T>;
  column: ReturnType<typeof atom<Column<T>>>;
  contextMenuEvent: React.MouseEvent<HTMLTableDataCellElement>;
  onClose: () => void;
}

export default function ContextMenu<T>(props: React.PropsWithChildren<ContextMenuProps<T>>): React.ReactPortal {

  return createPortal(
    <ClickAwayListener onClickAway={props.onClose}>
      <div 
        style={{top: props.contextMenuEvent.clientY,left: props.contextMenuEvent.clientX}} 
        className="am_table__body-context-menu am_table__body__context-menu--root"
      >
        {props.children}
      </div>
    </ClickAwayListener>, document.body
  );
}
