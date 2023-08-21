import { TableColumn } from "components/table";
import { EditableCellInfo } from "components/table/header/cell/editable-cell";
interface BodyProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    onCellChange?: (info: EditableCellInfo<T>, value: any) => void;
}
declare const Body: <T extends object>(props: BodyProps<T>) => import("react/jsx-runtime").JSX.Element;
export default Body;
