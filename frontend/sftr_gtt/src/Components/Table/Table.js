import * as React from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import "./Table.css";
const Table = (props) => {
  return (
    <div className="table">
      <DataGrid
        rows={props.list}
        columns={props.columnlist}
        pageSize={5}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default Table;
