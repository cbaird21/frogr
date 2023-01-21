import React from "react";

// import "../css/styles.css";

import Auth from "../../utils/auth";
import AppNavBar from "../NavBar";
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className=" bg-primary text-light mb-4 py-3 flex-row align-center fixed-top">
      <AppNavBar />
    </header>
  );
};

export default Header;
