import "./index.css";
import ReactDOM from "react-dom";
import React from "react";
import Table from "./components/table";
import TableProvider from "components/table/provider";
import createAtoms from "components/util/atoms";
import colors from "tailwindcss/colors";
import { useAtom } from "jotai";

const fakeData2 = {
  id: "97c969fd-7a4d-494d-b59d-40a2a25d266f",
  first_name: "Reza",
  last_name: "Ali",
  isTrue: false,
  age: 20,
  birthDate: new Date(),
  select_field: "select-1",
};
const fakeData = {
  id: "97c969fd-7a4d-494d-b59d-40a2a25d266f",
  first_name: "AmirMohammad",
  last_name: "Mirzaei",
  isTrue: false,
  age: 20,
  birthDate: new Date(),
  select_field: "select - 1",
};

const table = createAtoms<typeof fakeData>({
  rtl: true,
  idProperty: "id",
  color: colors.gray[600],
  row: { zebra: true, selection: { enabled: true, checkbox: true, onlyCheckboxSelect: true, multiple: true } }, // indexing: { enabled: true, label: "ردیف" },
  columns: [
    { name: "first_name", header: "First Name" },
    // { name: "age", header: "Age", minWidth: 200 },
    // { name: "isTrue", header: "isTrue", width: 200, render: (info) => (info.value ? "true" : "false") },
    // { name: "birthDate", header: "Birth Date", width: 200, render: (info) => new Date(info.value).toLocaleString() },
    // { name: "select_field", header: "Select", width: 150 },
    // { name: "last_name", header: "Last Name", flex: true, minWidth: 400 },
  ],
  classes: { wrapper: { classes: { root: "!am__max-h-[500px]" } }, cell: { classes: { root: "!am__p-2" } } },
});

function App() {
  const [columns, setColumns] = useAtom(table.atom.columns, { store: table.store });
  const [data, setData] = useAtom(table.atom.data, { store: table.store });
  const [selection, setRowSelection] = useAtom(table.atom.row.selection, { store: table.store });
  const [selected] = useAtom(table.atom.row.selected, { store: table.store });
  React.useEffect(() => {
    const FAKE_DATA = new Array(50).fill(fakeData).map((s, indx): typeof fakeData => ({ ...s, id: String(indx) }));
    columns.forEach((col) => {
      if (col.init.name === "first_name") {
        const colCopy = Object.assign({}, col.init);
        colCopy.editable = {
          type: "text",
          enabled: true,
          onChange(info) {
            const fakeDataCopy = Array.from(FAKE_DATA);
            const foundRow = fakeDataCopy.findIndex((s) => s.id === info.row.id);
            if (foundRow !== -1) {
              (fakeDataCopy as any)[foundRow][colCopy.name] = info.value;
              table.store.set(table.atom.data, fakeDataCopy);
            }
          },
        };
        table.store.set(col, colCopy);
      } else if (col.init.name === "age") {
        const colCopy = Object.assign({}, col.init);
        colCopy.editable = {
          type: "number",
          enabled: true,
          onChange(info) {
            const fakeDataCopy = Array.from(FAKE_DATA);
            const foundRow = fakeDataCopy.findIndex((s) => s.id === info.row.id);
            if (foundRow !== -1) {
              (fakeDataCopy as any)[foundRow][colCopy.name] = info.value;
              table.store.set(table.atom.data, fakeDataCopy);
            }
          },
        };
        table.store.set(col, colCopy);
      } else if (col.init.name === "birthDate") {
        const colCopy = Object.assign({}, col.init);
        colCopy.editable = {
          type: "date",
          enabled: true,
          onChange(info) {
            console.log(info);
          },
          render: (row, column, submitDateChange) => {
            const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
              submitDateChange(e.target.valueAsDate ?? undefined);
            };
            return (
              <div className="am__full">
                <input type="date" className="am__w-full" onChange={handleChangeDate} />
              </div>
            );
          },
        };
        table.store.set(col, colCopy);
      } else if (col.init.name === "isTrue") {
        const colCopy = Object.assign({}, col.init);
        colCopy.editable = {
          type: "checkbox",
          enabled: true,
          onChange(info) {
            const fakeDataCopy = Array.from(FAKE_DATA);
            const foundRow = fakeDataCopy.findIndex((s) => s.id === info.row.id);
            if (foundRow !== -1) {
              (fakeDataCopy as any)[foundRow][colCopy.name] = info.value;
              table.store.set(table.atom.data, fakeDataCopy);
            }
          },
        };
        table.store.set(col, colCopy);
      }
    });
    setData(FAKE_DATA);
  }, []);
  return (
    <div className="am__m-5">
      <Table store={table.store} atom={table.atom as any} />
    </div>
  );
}

ReactDOM.render(
  <div>
    <TableProvider store={table.store}>
      <App />
    </TableProvider>
  </div>,
  document.getElementById("root")
);

// export { default as AmirMuhaTable } from "./components/table";
