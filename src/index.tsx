import "./index.css";
import ReactDOM from "react-dom";
import Table from "./components/table";

ReactDOM.render(
  <Table
    idProperty="id"
    color="#2E9F82"
    rowProps={{ selection: true }}
    columns={[
      { name: "first_name", header: "نام", width: 300 },
      { name: "first_name", header: "نام", width: 300 },
      { name: "first_name", header: "نام", width: 300 },
      { name: "first_name", header: "نام", width: 300 },
      { name: "last_name", header: "نام خانوادگی", flex: true, minWidth: 500 },
    ]}
    data={[
      {
        id: "97c969fd-7a4d-494d-b59d-40a2a25d266f",
        first_name: "AmirMohammad",
        last_name: "Mirzaei",
      },
      {
        id: "97c969fd-7a4d-494d-b59d-40a2a25d269f",
        first_name: "AmirMohammad",
        last_name: "Mirzaei",
      },
      {
        id: "97c969fd-7a4d-494d-b59d-40a2a25d268f",
        first_name: "AmirMohammad",
        last_name: "Mirzaei",
      },
      {
        id: "97c969fd-7a4d-494d-b59d-40a2a25d267f",
        first_name: "AmirMohammad",
        last_name: "Mirzaei",
      },
      {
        id: "97c969fd-7a4d-494d-b59d-40a2a25d270f",
        first_name: "AmirMohammad",
        last_name: "Mirzaei",
      },
    ]}
  />,
  document.getElementById("root")
);

// export { default as AmirMuhaTable } from "./components/table";
