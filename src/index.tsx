import "./index.css";
import ReactDOM from "react-dom";
import React from "react";
import Table from "./components/table";
import TableProvider from "components/table/provider";
import createAtoms from "components/util/atoms";
import { useAtom } from "jotai";
import colors from "tailwindcss/colors";

const fakeData = {
  id: "97c969fd-7a4d-494d-b59d-40a2a25d266f",
  first_name: "AmirMohammad",
  last_name: "Mirzaei",
};

const table = createAtoms<any>({
  rtl: true,
  idProperty: "id",
  color: colors.orange[800],
  row: { indexing: { enabled: true, label: "ردیف" }, selection: true },
  columns: [
    { name: "first_name", header: "نام", width: 200 },
    { name: "first_name", header: "نام", width: 200 },
    { name: "first_name", header: "نام", width: 200 },
    { name: "last_name", header: "نام خانوادگی", flex: true, minWidth: 500 },
  ],
  classes: { cell: { classes: { root: "!am__p-2" } } },
});

const table2 = createAtoms<any>({
  idProperty: "id",
  color: colors.lime[800],
  row: { indexing: { enabled: true, label: "ردیف" } },
  columns: [
    { name: "first_name", header: "نام", width: 300, editable: { enabled: true, type: "text", onChange(info) {} } },
    {
      name: "last_name",
      header: "نام خانوادگی",
      flex: true,
      minWidth: 500,
      editable: {
        enabled: true,
        type: "text",
        onChange(info) {
          console.log(info);
        },
      },
    },
  ],
  data: [],
});

function App2() {
  const [, setData] = useAtom(table2.atom.data, { store: table2.store });
  React.useEffect(() => {
    setData(new Array(3).fill(fakeData).map((s, indx) => ({ ...s, id: String(indx) })));
  }, []);
  return (
    <div className="am__m-5">
      <Table atom={table2.atom as any} />
    </div>
  );
}

function App() {
  const [, setData] = useAtom(table.atom.data, { store: table.store });
  React.useEffect(() => {
    setData(new Array(5).fill(fakeData).map((s, indx) => ({ ...s, id: String(indx) })));
  }, []);
  return (
    <div className="am__m-5">
      <Table atom={table.atom as any} />
    </div>
  );
}

ReactDOM.render(
  <div>
    <TableProvider store={table.store}>
      <App />
    </TableProvider>
    <TableProvider store={table2.store}>
      <App2 />
    </TableProvider>
  </div>,
  document.getElementById("root")
);

// export { default as AmirMuhaTable } from "./components/table";
