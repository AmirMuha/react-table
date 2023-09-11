import React, { memo, useMemo } from "react";
import Cell from "components/table/cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { Checkbox } from "components/inputs/checkbox";
import { useAtom } from "jotai";
import { Row as RowType, Store, TableProps } from "types";

export interface RowProps<T> {
  store: Store;
  atom: TableProps<T>["atom"];
  row: RowType<T>;
  index: number;
}

const RowComponent = <T extends object>(props: RowProps<T>): React.ReactElement => {
  const [columns] = useAtom(props.atom.columns);
  const [currentPage] = useAtom(props.atom.pagination.currentPage);
  const [itemsPerPage] = useAtom(props.atom.pagination.itemsPerPage);
  const [indexingLabel] = useAtom(props.atom.row.indexing.label);
  const [indexingEnabled] = useAtom(props.atom.row.indexing.enabled);
  const [selection] = useAtom(props.atom.row.selection);
  const [rowRootClass] = useAtom(props.atom.classes.row.classes.root);
  const [rowRootOverrideClass] = useAtom(props.atom.classes.row.overrideClasses.root);
  const [cellRootClass] = useAtom(props.atom.classes.cell.classes.root);
  const [cellRootOverrrideClass] = useAtom(props.atom.classes.cell.overrideClasses.root);
  const [idProperty] = useAtom(props.atom.idProperty);
  const [selected, setSelected] = useAtom(props.atom.row.selected);
  const row = props.row;
  console.log(row);

  const id: string = (row as any)[idProperty];
  const isSelectionEnabled = typeof selection === "boolean" ? selection : !!selection?.enabled;
  const isSelectionCheckboxEnabled = typeof selection === "boolean" ? true : !!selection?.checkbox;
  const isMultiSelectEnabled = typeof selection === "boolean" ? true : !!selection?.multiple;
  const isCheckboxOnlySelectionEnabled = typeof selection === "boolean" ? false : !!selection?.onlyCheckboxSelect && isSelectionCheckboxEnabled;
  const isRowSelected = selection && !!selected[id];
  const onRowClick = props.atom.row.onClick;
  const rowNumber = itemsPerPage && currentPage && [1, 0].includes(currentPage) ? props.index + 1 + currentPage * itemsPerPage : props.index + 1;

  const toggleRowSelection = () => {
    if (isSelectionEnabled) {
      if (isMultiSelectEnabled) {
        const selectedCopy: any = Object.assign({}, selected);
        if (!isRowSelected) selectedCopy[id] = props.row;
        else delete selectedCopy[id];
        setSelected(selectedCopy);
      } else {
        let selectedCopy: any = Object.assign({}, selected);
        if (!isRowSelected) selectedCopy = { [id]: props.row };
        else delete selectedCopy[id];
        setSelected(selectedCopy);
      }
    }
  };

  const handleRowClick = () => {
    if (onRowClick) onRowClick(row as any);
    if (isSelectionEnabled && !isCheckboxOnlySelectionEnabled) toggleRowSelection();
  };
  return (
    <tr
      className={coalesce(
        rowRootOverrideClass,
        sc(
          rowRootClass,
          isSelectionEnabled && !isCheckboxOnlySelectionEnabled ? "am_table__body__row--selectable" : undefined,
          isRowSelected ? "am_table__body__row--selected" : undefined,
          "am_table__body--row am_table__body__row--root"
        )
      )}
      onClick={handleRowClick}
    >
      {isSelectionEnabled && isSelectionCheckboxEnabled ? (
        <td className={coalesce(cellRootOverrrideClass, sc(cellRootClass, "am_table__body--cell am_table__body__cell--root am_table__body__cell--checkbox"))}>
          <div className="am_table__body__cell__checkbox--root">
            <Checkbox checked={!!isRowSelected} onChange={toggleRowSelection} />
          </div>
        </td>
      ) : null}
      {indexingEnabled ? (
        <td className={coalesce(cellRootOverrrideClass, sc(cellRootClass, "am_table__body--cell am_table__body__cell--root am_table__body__cell--row-number"))}>
          <div className="am_table__body__cell__row-number--root">{rowNumber}</div>
        </td>
      ) : null}
      {columns.map((column, columnIndex) => (
        <Cell
          key={`body_row_cell_${columnIndex}`}
          atom={props.atom}
          row={row}
          store={props.store}
          column={column}
          columnIndex={columnIndex}
          rowIndex={props.index}
        />
      ))}
    </tr>
  );
};

// const areEqual = (p: RowProps<any>, c: RowProps<any>) => {
//   return p.row[p.store.get(p.atom.idProperty)] === c.row[c.store.get(c.atom.idProperty)];
// };
const Row: typeof RowComponent = memo(RowComponent) as any;
export default Row;
