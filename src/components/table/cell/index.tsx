import EditableCell from "../header/cell/editable-cell";
import coalesce from "common/helper/coalesce";
import sc from "common/helper/sc";
import { AMTableAtoms } from "components/util/atoms";
import { useAtom } from "jotai";
import { CellInfo, CellProps } from "types";

const Cell = <T extends object>(props: CellProps<T>) => {
  const [selected, setSelected] = useAtom(AMTableAtoms.selectedCell);

  const CELL_INFO: CellInfo<T> = {
    row: props.row,
    value: props.value,
    column: props.column,
  };
  let resolvedChild = props.column.render
    ? props.column.render(CELL_INFO)
    : props.value;
  const handleCellClick = () => {
    if (props.onCellClick) props.onCellClick(CELL_INFO);
  };

  return (
    <td
      className={coalesce(
        props.overrideClasses?.root,
        sc(
          props.classes?.root,
          "am_table__body--cell am_table__body__cell--root"
        )
      )}
      onClick={handleCellClick}
    >
      {props.column.editable && props.onCellChange ? (
        <EditableCell
          value={props.value}
          onChange={props.onCellChange}
          column={props.column}
          row={props.row}
        />
      ) : (
        resolvedChild
      )}
    </td>
  );
};

export default Cell;
