import {
  AppBar,
  Button,
  ListItem,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import React from "react";
import "react-sidebar-ui/dist/index.css";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import Navjson from "./Navigation.json";
import Logo from "./../../Assets/bofa.png";
import DateRangeIcon from "@material-ui/icons/DateRange";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import "./Navigation.css";

const NavigationBar = () => {
  const [open, setOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState("Home");

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setOpen(true)}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">SFTR GTT</Typography>
          <Button color="inherit">{`/${currentTab}`}</Button>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <div style={{ width: "150%" }}>
          <img src={Logo} alt="logo" className="nav_logo" />
          <List>
            {Navjson.navigation.map((jsonObj, index) => (
              <div key={jsonObj.name}>
                <div
                  onClick={() => itemOnTap(jsonObj.name)}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <ListItem button component={Link} to={jsonObj.url}>
                    <ListItemIcon>
                      {jsonObj.name === "Client" ? (
                        <BusinessCenterIcon />
                      ) : jsonObj.name === "Date" ? (
                        <DateRangeIcon />
                      ) : (
                        <SwapHorizIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={jsonObj.name} />
                  </ListItem>
                </div>
              </div>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );

  function itemOnTap(item) {
    setCurrentTab(item);
    setOpen(false);
  }
};

export default NavigationBar;
