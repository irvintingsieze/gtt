import React from "react";
import logo from "./../../Assets/bofa.png";
import "./Main.css";
const Main = () => {
  return (
    <div>
      <img className="main_centred" src={logo} alt="logo" />
      <h1 className="text_centred">WELCOME TO GOOD TO TRADE CHECK</h1>
    </div>
  );
};
export default Main;
