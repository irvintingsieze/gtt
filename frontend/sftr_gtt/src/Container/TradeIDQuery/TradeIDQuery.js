import React, { useEffect, useState } from "react";
import Table from "../../Components/Table/Table";
import Form from "../../Components/Form/Form";
import "./TradeIDQuery.css";
import axios from "axios";
import BASE_BACKEND_URL from "../../Utils/URLConstants";

const TradeIDQuery = () => {
  const [tradeID, setTradeID] = useState("");
  const [tradeList, setTradeList] = useState([]);
  const [respMsg, setRespMsg] = useState("");

  const fetchClientData = async () => {
    try {
      const URL = BASE_BACKEND_URL + "/client-status/trade?tradeid=" + tradeID;
      const response = await axios.get(URL);
      if (
        response.data === "Trade ID Not Found!" ||
        response.data === "Not In Scope For GTT Check!" ||
        response.data === "Client Pass GTT Check!"
      ) {
        setRespMsg(response.data);
        setTradeList([]);
        return;
      }
      setRespMsg("");
      setTradeList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, [tradeID]);

  return (
    <div className="container_margins">
      <Form name="Trade ID" onSubmitChange={setTradeID} />
      <center className="text_size">{respMsg}</center>
      {tradeList.length ? (
        <Table list={tradeList} />
      ) : (
        <center className="text_size">Please Query A Trade ID</center>
      )}
    </div>
  );
};
export default TradeIDQuery;
