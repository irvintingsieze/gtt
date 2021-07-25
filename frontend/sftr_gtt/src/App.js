import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ClientQuery from "./Container/ClientIDQuery/ClientIDQuery";
import DateQuery from "./Container/DateQuery/DateQuery";
import TradeQuery from "./Container/TradeIDQuery/TradeIDQuery";
import Main from "./Container/Main/Main";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./Container/Navigation/NavigationBar";

function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Route exact path="/" component={Main} />
        <Route path="/bofa/client" component={ClientQuery} />
        <Route path="/bofa/date" component={DateQuery} />
        <Route path="/bofa/trade" component={TradeQuery} />
      </Router>
    </>
  );
}

export default App;
