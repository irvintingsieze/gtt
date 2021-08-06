import * as React from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import "./Table.css";
const Table = (props) => {
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "tradeId", headerName: "Trade ID", width: 180 },
    { field: "entityId", headerName: "Entity ID", width: 200 },
    { field: "clientId", headerName: "Client ID", width: 200 },
    { field: "documentId", headerName: "Document ID", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
  ];
  return (
    <div className="table">
      <DataGrid
        rows={props.list}
        columns={columns}
        pageSize={5}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
};

export default Table;
