import Row from "components/table/row";
import { TableColumn } from "components/table";
import { EditableCellInfo } from "components/table/header/cell/editable-cell";

interface BodyProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
  selection?: boolean;
}

const Body = <T extends object>(props: BodyProps<T>) => {
  return (
    <tbody>
      {props.data.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          onCellChange={props.onCellChange}
          columns={props.columns}
          selection={props.selection}
          row={{ ...row, index: rowIndex }}
        />
      ))}
    </tbody>
  );
};

export default Body;
