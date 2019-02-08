import React from "react";
import logo from "./Logo.svg";
import "./AppHeader.css";
const AppHeader = () => {
  return (
    <header className="AppHeader">
      <img src={logo} className="Logo" alt="logo" />
      <h1>Locate alternative fueling stations</h1>
    </header>
  );
};
export default AppHeader;
