import Row from "components/table/row";
import { TableColumn } from "components/table";
import { EditableCellInfo } from "components/table/header/cell/editable-cell";

interface BodyProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
}

const Body = <T extends Record<keyof T, any>>(props: BodyProps<T>) => {
  return (
    <tbody>
      {props.data.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          onCellChange={props.onCellChange}
          columns={props.columns}
          row={{ ...row, index: rowIndex }}
        />
      ))}
    </tbody>
  );
};

export default Body;
