import React from "react";


import Auth from "../../utils/auth";
import AppNavBar from "../NavBar";
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="text-light m-4 py-3 flex-row align-center">
      <AppNavBar />
    </header>
  );
};

export default Header;
