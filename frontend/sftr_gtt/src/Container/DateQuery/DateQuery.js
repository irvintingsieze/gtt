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

  const fetchClientData = async () => {
    try {
      const sgDate = moment(date).format("YYYYMMDD");
      const URL = BASE_BACKEND_URL + "/client-status/date?date=" + sgDate;
      const response = await axios.get(URL);
      if (
        response.data === "No Trades In This Date!" ||
        response.data === "Not In Scope For GTT Check!" ||
        response.data === "In Scope for GTT Check And GTT!"
      ) {
        setRespMsg(response.data);
        setClientList([]);
        return;
      }
      setRespMsg("");
      setClientList(response.data);
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
        <Table list={clientList} />
      ) : (
        <center className="text_size">Please Select A Date</center>
      )}
    </div>
  );
};
export default DateQuery;
