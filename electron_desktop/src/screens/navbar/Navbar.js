import React from 'react';
import './navbar.css';
const Navbar = () => {
    return (
        <div className="nav-container">
            <nav className="navbar sticky-top navbar-dark bg-dark" id="nav-header">
                <a className="navbar-brand" href="#" id="ul-heading-img">
                    <img className="img-header" src={require("../images/logo.png")}/>
                </a>
                <ul className="navbar-nav" id="ul-heading">
                    <li className="nav-item" id="nav-title">
                        <h3 className="nav-link text-light" href="#">Time Table Management System</h3>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;