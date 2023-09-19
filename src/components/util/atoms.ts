import { atom, createStore, PrimitiveAtom, SetStateAction, useAtom, WritableAtom } from "jotai";
import { Cell, CellOptions, ClassesOptions, Column, HeaderCellOptions, HeaderOptions, PaginationOptions, RowOptions, SortOptions, TableOptions } from "types";

export type PaginationAtoms<T> = {
  enabled: PrimitiveAtom<boolean>;
  totalPages: WritableAtom<number | undefined, [SetStateAction<number | undefined>], any>;
  currentPage: WritableAtom<number | undefined, [SetStateAction<number | undefined>], any>;
  itemsPerPage: WritableAtom<number | undefined, [SetStateAction<number | undefined>], any>;
};
function getPaginationAtoms<T>(initialOptions?: PaginationOptions<T>): PaginationAtoms<T> {
  return {
    enabled: atom(initialOptions?.enabled ?? false),
    totalPages: atom(initialOptions?.totalPages),
    currentPage: atom(initialOptions?.currentPage),
    itemsPerPage: atom(initialOptions?.itemsPerPage),
  };
}

export type ContextMenuOptions<T> = {
    enabled: boolean,
    render: (info: Cell<T>) => React.ReactElement;
  }
export type CellAtoms<T> = {
  selection: WritableAtom<boolean, [SetStateAction<boolean>], any>;
  selected: WritableAtom<Record<string, any>, [SetStateAction<Record<string, any>>], any>;
  onClick: CellOptions<T>["onClick"];
  contextMenu: WritableAtom<ContextMenuOptions<T> | undefined, [SetStateAction<ContextMenuOptions<T> | undefined>], any>;
};
function getCellAtoms<T>(initialOptions?: CellOptions<T>): CellAtoms<T> {
  return {
    contextMenu: initialOptions?.contextMenu?atom({
      enabled: initialOptions.contextMenu.enabled ?? false,
      render: initialOptions.contextMenu.render,
    }):atom(undefined) as any,
    selection: atom(initialOptions?.selection ?? false),
    selected: atom<Record<string, any>>({}),
    onClick: initialOptions?.onClick,
  };
}

export type HeaderCellAtoms<T> = {
  width: WritableAtom<number | undefined, [SetStateAction<number | undefined>], any>;
  onResize: HeaderCellOptions<T>["onResize"];
  onClick: HeaderCellOptions<T>["onClick"];
};
function getHeaderCellAtoms<T>(initialOptions?: HeaderCellOptions<T>): HeaderCellAtoms<T> {
  return {
    onClick: initialOptions?.onClick,
    onResize: initialOptions?.onResize,
    width: atom(initialOptions?.width),
  };
}

export type HeaderAtoms<T> = {
  selection: WritableAtom<boolean, [SetStateAction<boolean>], any>;
  selected: WritableAtom<Record<string, any>, [SetStateAction<Record<string, any>>], any>;
  onSort: HeaderCellOptions<T>["onResize"];
  cell: HeaderCellAtoms<T>;
};
function getHeaderAtoms<T>(initialOptions?: HeaderOptions<T>): HeaderAtoms<T> {
  return {
    selection: atom(initialOptions?.selection ?? false),
    selected: atom<Record<string, any>>({}),
    onSort: initialOptions?.onSort,
    cell: getHeaderCellAtoms<T>(initialOptions?.cell),
  };
}

export type RowAtoms<T> = {
  selection: WritableAtom<RowOptions<T>["selection"], [SetStateAction<RowOptions<T>["selection"]>], any>;
  selected: WritableAtom<Record<string, T>, [SetStateAction<Record<string, T>>], any>;
  onClick: RowOptions<T>["onClick"];
  indexing: {
    enabled: WritableAtom<boolean, [SetStateAction<boolean>], any>;
    label: WritableAtom<string | undefined, [SetStateAction<string | undefined>], any>;
  };
};
function getRowAtoms<T>(initialOptions?: RowOptions<T>): RowAtoms<T> {
  return {
    selected: atom<Record<string, T>>({}),
    selection: atom(initialOptions?.selection ?? false) as any,
    onClick: initialOptions?.onClick,
    indexing: {
      enabled: atom(initialOptions?.indexing?.enabled ?? false),
      label: atom(initialOptions?.indexing?.label),
    },
  };
}

export type SortAtoms<T> = {
  defaultSortedColumn: WritableAtom<keyof T | null | undefined, [SetStateAction<keyof T | null | undefined>], any>;
  defaultSortDirection: WritableAtom<"asc" | "desc", [SetStateAction<"asc" | "desc">], any>;
};
function getSortAtoms<T>(initialOptions?: SortOptions<T>): SortAtoms<T> {
  return {
    defaultSortedColumn: atom(initialOptions?.defaultSortedColumn),
    defaultSortDirection: atom(initialOptions?.defaultSortDirection ?? "asc"),
  };
}

function getClassesAtoms<T>(initialOptions?: ClassesOptions<T>) {
  return {
    body: {
      classes: { root: atom(initialOptions?.body?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.body?.overrideClasses?.root) },
    },
    row: {
      classes: { root: atom(initialOptions?.row?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.row?.overrideClasses?.root) },
    },
    pagination: {
      classes: { root: atom(initialOptions?.pagination?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.pagination?.overrideClasses?.root) },
    },
    headerRow: {
      classes: { root: atom(initialOptions?.headerRow?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.headerRow?.overrideClasses?.root) },
    },
    headerCell: {
      classes: {
        root: atom(initialOptions?.headerCell?.classes?.root),
        resizeHandle: { root: atom(initialOptions?.headerCell?.classes?.resizeHandle?.root) },
        content: { root: atom(initialOptions?.headerCell?.classes?.content?.root) },
        sortBtn: { root: atom(initialOptions?.headerCell?.classes?.sortBtn?.root) },
      },
      overrideClasses: {
        root: atom(initialOptions?.headerCell?.overrideClasses?.root),
        resizeHandle: { root: atom(initialOptions?.headerCell?.overrideClasses?.resizeHandle?.root) },
        content: { root: atom(initialOptions?.headerCell?.overrideClasses?.content?.root) },
        sortBtn: { root: atom(initialOptions?.headerCell?.overrideClasses?.sortBtn?.root) },
      },
    },
    cell: {
      classes: { root: atom(initialOptions?.cell?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.cell?.overrideClasses?.root) },
    },
    header: {
      classes: { root: atom(initialOptions?.header?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.header?.overrideClasses?.root) },
    },
    table: {
      classes: { root: atom(initialOptions?.table?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.table?.overrideClasses?.root) },
    },
    container: {
      classes: { root: atom(initialOptions?.container?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.container?.overrideClasses?.root) },
    },
    wrapper: {
      classes: { root: atom(initialOptions?.wrapper?.classes?.root) },
      overrideClasses: { root: atom(initialOptions?.wrapper?.overrideClasses?.root) },
    },
  };
}

export type ColumnAtom<T> = WritableAtom<Column<T>, [SetStateAction<Column<T>>], any> & { init: Column<T> };
export type Store = ReturnType<typeof createStore>;
export type Atoms<T> = {
  idProperty: WritableAtom<string, [SetStateAction<string>], any>;
  color: WritableAtom<string | undefined, [SetStateAction<string | undefined>], any>;
  columnsMap: WritableAtom<Record<string, Column<T>>, [SetStateAction<Record<string, Column<T>>>], any>;
  columns: WritableAtom<ColumnAtom<T>[], [SetStateAction<ColumnAtom<T>[]>], any>;
  data: WritableAtom<T[], [SetStateAction<T[]>], any>;
  header: HeaderAtoms<T>;
  cell: CellAtoms<T>;
  row: RowAtoms<T>;
  sort: SortAtoms<T>;
  pagination: PaginationAtoms<T>;
  rtl: WritableAtom<boolean, [SetStateAction<boolean>], any>;
  classes: ReturnType<typeof getClassesAtoms<T>>;
};
export type TableConfig<T> = { store: Store; atom: Atoms<T> };
export default function createAtoms<T>(initialOptions: TableOptions<T>): TableConfig<T> {
  const columnsMap: Record<string, Column<T>> = {};
  initialOptions.columns.forEach((col) => (columnsMap[col.name as string] = col));
  const store = createStore();
  const tableAtom: Atoms<T> = {
    idProperty: atom(initialOptions.idProperty ?? "id"),
    columnsMap: atom(columnsMap),
    columns: atom(initialOptions.columns.map((col) => atom(col))) as any,
    data: atom(initialOptions.data ?? []),
    color: atom(initialOptions.color),
    header: getHeaderAtoms<T>(initialOptions.header),
    sort: getSortAtoms<T>(initialOptions.sort),
    row: getRowAtoms<T>(initialOptions.row),
    cell: getCellAtoms<T>(initialOptions.cell),
    pagination: getPaginationAtoms<T>(initialOptions.pagination),
    classes: getClassesAtoms<T>(initialOptions.classes),
    rtl: atom(initialOptions.rtl ?? false),
  };
  return { atom: tableAtom, store };
}
