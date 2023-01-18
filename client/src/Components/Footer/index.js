import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <footer className="w-100 mt-auto bg-secondary p-4">
            <div className="container text-center mb-5">
                {location.pathname !== '/' && (
                    <button
                        className="btn btn-dark mb-3"
                        onClick={() => navigate(-1)}
                    >
                        &larr; Go Back
                    </button>
                )}
                <ul class="nav justify-content-center">
        <li class="nav-item">
            <a
                class="nav-link active"
                aria-current="page"
                href="https://github.com/jennnmarshall"
                target="_blank"
            ><i class="fa-brands fa-github"></i>Jenn</a>
            </li>
            <li class="nav-item">
            <a
                class="nav-link"
                href="https://github.com/cbaird21"
                target="_blank"
            ><i class="fa-brands fa-github"></i>Chandler</a>
            </li>
            <li class="nav-item">
            <a
                class="nav-link"
                href="https://github.com/mgetz34"
                target="_blank"
            ><i class="fa-brands fa-github"></i>Michael</a>
            </li>
            <li class="nav-item">
            <a
                class="nav-link"
                href="https://github.com/GarrettA01"
                target="_blank"
            ><i class="fa-brands fa-github"></i>Garrett</a>
            </li>
            <li class="nav-item">
            <a
                class="nav-link"
                href="https://github.com/GarrettA01"
                target="_blank"
            ><i class="fa-brands fa-github"></i>Andy</a>
            </li>        
        </ul>
            </div>
        </footer>
    );
};

export default Footer;
