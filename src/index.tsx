import "./index.css";
import ReactDOM from "react-dom";
import Table from "./components/table";

ReactDOM.render(
  <Table
    columns={[
      { name: "first_name", header: "نام", width: 300 },
      { name: "first_name", header: "نام", width: 300 },
      { name: "first_name", header: "نام", width: 300 },
      { name: "first_name", header: "نام", width: 300 },
      { name: "last_name", header: "نام خانوادگی", flex: true, minWidth: 500 },
    ]}
    data={[
      { first_name: "AmirMohammad", last_name: "Mirzaei" },
      { first_name: "AmirMohammad", last_name: "Mirzaei" },
      { first_name: "AmirMohammad", last_name: "Mirzaei" },
      { first_name: "AmirMohammad", last_name: "Mirzaei" },
      { first_name: "AmirMohammad", last_name: "Mirzaei" },
    ]}
  />,
  document.getElementById("root")
);

// export { default as AmirMuhaTable } from "./components/table";
