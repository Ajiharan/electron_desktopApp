import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="nav-container">
      <nav className="navbar sticky-top navbar-dark bg-dark" id="nav-header">
        <Link to="/" className="navbar-brand" href="#" id="ul-heading-img">
          <img className="img-header" src={require("../images/logo.png")} />
        </Link>

        <ul className="navbar-nav" id="ul-heading">
          <li className="nav-item" id="nav-title">
            <h3 className="nav-link text-light" href="#">
              Time Table Management System
            </h3>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
