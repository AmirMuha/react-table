import "./index.css";
import ReactDOM from "react-dom";
import React from "react";
import Table from "./components/table";
import TableProvider from "components/table/provider";
import createAtoms from "components/util/atoms";
import { useAtom } from "jotai";

const fakeData = {
  id: "97c969fd-7a4d-494d-b59d-40a2a25d266f",
  first_name: "AmirMohammad",
  last_name: "Mirzaei",
};

const { store, atom } = createAtoms<any>({
  idProperty: "id",
  color: "#2E9F82",
  row: { selection: true, indexing: { enabled: true, label: "ردیف" } },
  columns: [
    { name: "first_name", header: "نام", width: 300 },
    { name: "last_name", header: "نام خانوادگی", flex: true, minWidth: 500 },
  ],
  data: [],
});

function App() {
  const [data, setData] = useAtom(atom.data);
  console.log(data);

  React.useEffect(() => {
    setData(new Array(2000).fill(fakeData).map((s, indx) => ({ ...s, id: String(indx) })));
  }, []);
  return (
    <div className="am__m-5">
      <Table atom={atom as any} />
    </div>
  );
}

ReactDOM.render(
  <TableProvider store={store}>
    <App />
  </TableProvider>,
  document.getElementById("root")
);

// export { default as AmirMuhaTable } from "./components/table";
