import React from 'react';
import { Link } from 'react-router-dom';
// import "../css/styles.css";

import Auth from '../../utils/auth';
import NavBar from '../NavBar';
const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <header className=" bg-primary text-light mb-4 py-3 flex-row align-center">
            <NavBar />
        </header>
    );
};

export default Header;
