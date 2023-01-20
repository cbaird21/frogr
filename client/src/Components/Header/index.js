import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import NavBar from '../NavBar';
import frogPic from '../images/frogbanner.png';
// import '../css/styles.css';

const styles = {
    header: {
        height: '20vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: frogPic,
    },
    img: {

    },
};

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
      <header
      >
        {/* <img src={frogPic} fit="cover"/> */}
        <NavBar />
      </header>
    );
};

export default Header;
