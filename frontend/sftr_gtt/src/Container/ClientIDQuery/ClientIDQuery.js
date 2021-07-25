import React, { useEffect, useState } from "react";
import Table from "../../Components/Table/Table";
import Form from "../../Components/Form/Form";
import "./ClientIDQuery.css";
import axios from "axios";
import BASE_BACKEND_URL from "../../Utils/URLConstants";

const ClientIDQuery = () => {
  const [clientID, setClientID] = useState("");
  const [clientList, setClientList] = useState([]);
  const [respMsg, setRespMsg] = useState("");
  const client_columns = [
    { field: "id", headerName: "Trade ID", width: 200 },
    { field: "clientID", headerName: "Client ID", width: 200 },
    { field: "entityID", headerName: "Entity ID", width: 200 },
    { field: "documentID", headerName: "Document ID", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
  ];

  const fetchClientData = async () => {
    try {
      const displayList = [];
      const URL = BASE_BACKEND_URL + "/client-status/client/" + clientID;
      const response = await axios.get(URL);
      if (
        response.data === "Client Not Found" ||
        response.data === "Client Not Found" ||
        response.data === "Client Is Good To Trade"
      ) {
        setRespMsg(response.data);
        setClientList([]);
        return;
      }
      setRespMsg("");
      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < response.data[i].transactionList.length; j++) {
          displayList.push({
            id: response.data[i].transactionList[j].tradeId,
            clientID: response.data[i].client.clientID,
            entityID: response.data[i].client.entityID,
            documentID: response.data[i].client.documentID,
            date: response.data[i].transactionList[j].date,
          });
        }
      }
      setClientList(displayList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, [clientID]);

  return (
    <div className="container_margins">
      <Form name="Client ID" onSubmitChange={setClientID} />
      <center className="text_size">{respMsg}</center>
      {clientList.length ? (
        <Table list={clientList} columnlist={client_columns} />
      ) : (
        <center className="text_size">Please Query A Client ID</center>
      )}
    </div>
  );
};
export default ClientIDQuery;
