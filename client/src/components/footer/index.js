import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
      <footer className="w-100">
        <div className="container text-center">
          {location.pathname !== "/" && (
            <button className="btn btn-dark" onClick={() => navigate(-1)}>
              &larr; Go Back
            </button>
          )}
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a
                className="nav-link green"
                aria-current="page"
                href="https://github.com/jennnmarshall"
                target="blank"
              >
                {/* <FontAwesomeIcon icon={brands('github')}/> */}
                Jenn
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link green"
                href="https://github.com/cbaird21"
                target="blank"
              >
                {/* <FontAwesomeIcon icon="fa-brands fa-github" /> */}
                Chandler
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link green"
                href="https://github.com/mgetz34"
                target="blank"
              >
                {/* <FontAwesomeIcon icon="fa-brands fa-github" /> */}
                Michael
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link green"
                href="https://github.com/GarrettA01"
                target="blank"
              >
                {/* <FontAwesomeIcon icon="fa-brands fa-github" /> */}
                Garrett
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link green"
                href="https://github.com/andylaborde"
                target="blank"
              >
                {/* <FontAwesomeIcon icon="fa-brands fa-github" /> */}
                Andy
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
};

export default Footer;
