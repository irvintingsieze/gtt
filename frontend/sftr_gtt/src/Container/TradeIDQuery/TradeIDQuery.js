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
  const trade_columns = [
    { field: "id", headerName: "Client Entity ID", width: 200 },
    { field: "tradeID", headerName: "Trade ID", width: 200 },
    { field: "clientID", headerName: "Client ID", width: 200 },
    { field: "entityID", headerName: "Entity ID", width: 200 },
    { field: "documentID", headerName: "Document ID", width: 200 },
  ];

  const fetchClientData = async () => {
    try {
      const displayList = [];
      const URL = BASE_BACKEND_URL + "/client-status/trade/" + tradeID;
      const response = await axios.get(URL);
      if (
        response.data === "Trade ID Not Found" ||
        response.data === "Client Is Not In Scope And Good To Trade" ||
        response.data === "Client Is Good To Trade!"
      ) {
        setRespMsg(response.data);
        setTradeList([]);
        return;
      }
      setRespMsg("");
      for (let i = 0; i < response.data.clients.length; i++) {
        displayList.push({
          id: response.data.clients[i].id,
          tradeID: response.data.tradeID,
          clientID: response.data.clients[i].clientID,
          entityID: response.data.clients[i].entityID,
          documentID: response.data.clients[i].documentID,
        });
      }
      console.log(displayList);
      setTradeList(displayList);
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
        <Table list={tradeList} columnlist={trade_columns} />
      ) : (
        <center className="text_size">Please Query A Trade ID</center>
      )}
    </div>
  );
};
export default TradeIDQuery;
