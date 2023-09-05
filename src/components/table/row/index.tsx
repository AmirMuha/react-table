import React, { useMemo } from "react";
import Cell from "components/table/cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { RowProps } from "types";
import { useAtom } from "jotai";
import { AMTableAtoms } from "components/util/atoms";

const Row = <T extends object>(props: RowProps<T>) => {
  const id = props.row[props.idProperty as keyof T] as string;
  const [selected, setSelected] = useAtom(AMTableAtoms.selectedRow);
  const IS_ROW_SELECTED = props.selection && !!selected[id];
  console.log(selected);

  const toggleRowSelection = () => {
    if (props.selection) {
      const selectedCopy = Object.assign({}, selected);
      if (!IS_ROW_SELECTED) selectedCopy[id] = props.row;
      else delete selectedCopy[id];
      setSelected(selectedCopy);
    }
  };

  const handleRowClick = () => {
    if (props.onRowClick) props.onRowClick(props.row);
    if (props.selection) toggleRowSelection();
  };
  return (
    <tr
      className={coalesce(
        props.overrideClasses?.root,
        sc(
          props.classes?.root,
          props.selection ? "am_table__body__row--selectable" : undefined,
          IS_ROW_SELECTED ? "am_table__body__row--selected" : undefined,
          "am_table__body--row am_table__body__row--root"
        )
      )}
      onClick={handleRowClick}
    >
      {props.selection ? (
        <td>
          <input
            type="checkbox"
            checked={IS_ROW_SELECTED}
            onChange={toggleRowSelection}
          />
        </td>
      ) : null}
      {props.columns.map((column, columnIndex) => (
        <Cell
          key={columnIndex}
          {...props.cellProps}
          row={props.row}
          column={column}
          value={(props.row as any)[column.name]}
        />
      ))}
    </tr>
  );
};

export default Row;
