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

  const fetchClientData = async () => {
    if (clientID.length === 0) return;
    try {
      const URL =
        BASE_BACKEND_URL + "/client-status/client?clientid=" + clientID;
      const response = await axios.get(URL);
      if (
        response.data === "No Clients Found!" ||
        response.data === "Client Pass GTT Check!"
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

  useEffect(() => {
    fetchClientData();
  }, [clientID]);

  return (
    <div className="container_margins">
      <Form name="Client ID" onSubmitChange={setClientID} />
      <center className="text_size">{respMsg}</center>
      {clientList.length ? (
        <Table list={clientList} />
      ) : (
        <center className="text_size">Please Query A Client ID</center>
      )}
    </div>
  );
};
export default ClientIDQuery;
