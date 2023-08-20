import Row from "components/table/row";
import { TableColumn } from "components/table";

interface BodyProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}

const Body = <T extends Record<string, any>>({
  columns,
  data,
}: BodyProps<T>) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          columns={columns}
          row={{ ...row, index: rowIndex }}
        />
      ))}
    </tbody>
  );
};

export default Body;
