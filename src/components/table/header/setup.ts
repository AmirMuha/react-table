import { useAtom } from "jotai";
import { TableProps } from "types";

export default function useSetupHeader<T>(_atom: TableProps<T>["atom"]) {
  const [columns] = useAtom(_atom.columns);
  const [selection] = useAtom(_atom.row.selection);

  return { columns, selection };
}
