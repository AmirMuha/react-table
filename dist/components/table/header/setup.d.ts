import { TableProps } from "types";
export default function useSetupHeader<T>(_atom: TableProps<T>["atom"]): {
    columns: (import("jotai").PrimitiveAtom<import("types").Column<T>> & {
        init: import("types").Column<T>;
    })[];
    selection: boolean;
};
