import React, { useState, useEffect } from "react";
import data_format from "./../../Assets/data_format.PNG";
import axios from "axios";
import "./Main.css";
import BASE_BACKEND_URL from "../../Utils/URLConstants";
const Main = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [data, setData] = useState("");
  const postData = async (text) => {
    const res = await axios.post("http://localhost:3000/add_data", {
      dataInput: text,
    });
    console.log(res);
    if (res.data.status === 500) {
      setResponseMessage(res.data.message);
    }
  };
  const showFile = async (e) => {
    const reader = new FileReader();
    //console.log(e.target.result);
    reader.onload = async (e) => {
      const text = e.target.result;
      try {
        JSON.parse(text);
        setResponseMessage("Text File Successfully Uploaded!");
        console.log("THIS TEXT" + text);
        setData(text);
      } catch {
        setResponseMessage("Input Text File Is Not In Correct Format!");
      }
    };
    reader.readAsText(e.target.files[0]);
  };
  useEffect(() => {
    if (data.length > 0) {
      postData(data);
    }
  }, [data]);
  return (
    <center>
      <h2 className="text_centred">Input Your Data</h2>
      <input
        type="file"
        onChange={(e) => {
          showFile(e);
          postData(data);
        }}
      />
      <h3>{responseMessage}</h3>
      <h3>Please Input The JSON in below format</h3>
      <img src={data_format} alt="data format" />
    </center>
  );
};
export default Main;
