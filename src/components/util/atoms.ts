import { atom, createStore } from "jotai";
import { CellOptions, ClassesOptions, HeaderCellOptions, HeaderOptions, PaginationOptions, RowOptions, SortOptions, TableOptions } from "types";

function getPaginationAtoms<T>(initialOptions?: PaginationOptions<T>) {
  return {
    enabled: atom(initialOptions?.enabled ?? false),
    totalPages: atom(initialOptions?.totalPages),
    currentPage: atom(initialOptions?.currentPage),
    itemsPerPage: atom(initialOptions?.itemsPerPage),
  };
}

function getCellAtoms<T>(initialOptions?: CellOptions<T>) {
  return {
    editable: atom(initialOptions?.editable ?? false),
    selection: atom(initialOptions?.selection ?? false),
    selected: atom<Record<string, any>>({}),
    onClick: initialOptions?.onClick,
    onChange: initialOptions?.onChange,
  };
}

function getHeaderCellAtoms<T>(initialOptions?: HeaderCellOptions<T>) {
  return {
    onClick: initialOptions?.onClick,
    onResize: initialOptions?.onResize,
    width: atom(initialOptions?.width),
  };
}

function getHeaderAtoms<T>(initialOptions?: HeaderOptions<T>) {
  return {
    selection: atom(initialOptions?.selection ?? false),
    selected: atom<Record<string, any>>({}),
    onSort: initialOptions?.onSort,
    cell: getHeaderCellAtoms<T>(initialOptions?.cell),
  };
}

function getRowAtoms<T>(initialOptions?: RowOptions<T>) {
  return {
    editable: atom(initialOptions?.editable ?? false),
    selected: atom<Record<string, T>>({}),
    selection: atom(initialOptions?.selection ?? false),
    onClick: initialOptions?.onClick,
    classes: { root: atom(initialOptions?.classes?.root) },
    overrideClasses: { root: atom(initialOptions?.overrideClasses?.root) },
    indexing: {
      enabled: atom(initialOptions?.indexing?.enabled),
      label: atom(initialOptions?.indexing?.label),
    },
  };
}

function getSortAtoms<T>(initialOptions?: SortOptions<T>) {
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

export function createAtoms<T>(initialOptions: TableOptions<T>) {
  const store = createStore();
  const tableAtom = {
    color: atom(initialOptions.color),
    data: initialOptions.row?.editable ? atom(initialOptions.data.map((item) => atom(item))) : atom(initialOptions.data),
    columns: atom(initialOptions.columns.map((col) => atom(col))),
    idProperty: atom(initialOptions.idProperty ?? "id"),
    header: getHeaderAtoms<T>(initialOptions.header),
    sort: getSortAtoms<T>(initialOptions.sort),
    row: getRowAtoms<T>(initialOptions.row),
    cell: getCellAtoms<T>(initialOptions.cell),
    pagination: getPaginationAtoms<T>(initialOptions.pagination),
    classes: getClassesAtoms<T>(initialOptions.classes),
  };
  return { atom: tableAtom, store };
}
