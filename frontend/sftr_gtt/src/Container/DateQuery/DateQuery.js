import React, { useState } from "react";
import Table from "../../Components/Table/Table";
import axios from "axios";
import BASE_BACKEND_URL from "../../Utils/URLConstants";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import DEFAULT_COLOR from "../../Utils/Color";
import moment from "moment";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const DateQuery = () => {
  const [date, setDate] = useState(new Date());
  const [clientList, setClientList] = useState([]);
  const [respMsg, setRespMsg] = useState("");
  const trade_columns = [
    { field: "id", headerName: "Row", width: 150 },
    { field: "clientID", headerName: "Client ID", width: 200 },
    { field: "entityID", headerName: "Entity ID", width: 200 },
    { field: "documentID", headerName: "Document ID", width: 200 },
    { field: "tradeID", headerName: "Trade ID", width: 200 },
  ];

  const fetchClientData = async () => {
    try {
      const displayList = [];
      const sgDate = moment(date).format("YYYYMMDD");
      const URL = BASE_BACKEND_URL + "/client-status?date=" + sgDate;
      console.log(URL);
      const response = await axios.get(URL);
      if (
        response.data === "No Trade On This Date" ||
        response.data === "All Trades Are Not In Scope" ||
        response.data === "All Clients Are GTT On This Date!"
      ) {
        setRespMsg(response.data);
        setClientList([]);
        return;
      }
      setRespMsg("");
      let count = 0;
      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < response.data[i].clients.length; j++) {
          for (let k = 0; k < response.data[i].transactions.length; k++) {
            count += 1;
            displayList.push({
              id: count,
              clientID: response.data[i].clients[j].clientID,
              entityID: response.data[i].clients[j].entityID,
              documentID: response.data[i].clients[j].documentID,
              tradeID: response.data[i].transactions[k].toString(),
            });
          }
        }
      }
      setClientList(displayList);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container_margins">
      <center>
        <h2 className="form_header">Query By Date</h2>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date-picker-inline"
            value={date}
            onChange={setDate}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
        <Button
          style={{
            backgroundColor: DEFAULT_COLOR,
            color: "white",
          }}
          variant="contained"
          className="submit_form"
          type="submit"
          onClick={fetchClientData}
        >
          Query
        </Button>
      </center>

      <center className="text_size">{respMsg}</center>
      {clientList.length ? (
        <Table list={clientList} columnlist={trade_columns} />
      ) : (
        <center className="text_size">Please Select A Date</center>
      )}
    </div>
  );
};
export default DateQuery;
