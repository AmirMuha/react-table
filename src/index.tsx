import ReactDOM from "react-dom";
import React from "react";
import Table from "./components/table";

ReactDOM.render(
  <Table
    columns={[
      { name: "first_name", header: "نام" },
      { name: "last_name", header: "نام خانوادگی" },
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
