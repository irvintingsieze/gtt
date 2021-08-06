import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Main.css";
import BASE_BACKEND_URL from "../../Utils/URLConstants";
import format from "./../../Assets/data_format.PNG";
const Main = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const showFile = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    const res = await axios.post(BASE_BACKEND_URL + "/upload", data, {});
    setResponseMessage(res.data);
    return;
  };

  return (
    <center>
      <h2 className="text_centred">Input Your Data</h2>
      <input
        type="file"
        onChange={(e) => {
          showFile(e);
        }}
      />
      <h3>{responseMessage}</h3>
      <h3>Please Input Text File In The Format Below!</h3>
      <img src={format} alt="data format" className="img" />
    </center>
  );
};
export default Main;
