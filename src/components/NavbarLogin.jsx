import React, { useState } from "react";
import mainLogo from "../assets/images/MainLogo.png";
import "../css/Navbar.css";
import { IoClose, IoMenu } from "react-icons/io5";
import "../css/Login.css";
import { Link } from "react-router-dom";

const NavbarLogin = () => {
  const [isDark, setIsDark] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar-login">
      <div className="logo-login">
        <img src={mainLogo} />
        <h1 className="header1">DormMate</h1>
      </div>
      <div className={`nav-menu ${menuOpen ? "show-menu" : ""}`}>
        <ul className="nav-links-login">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/#about">About</Link>
          </li>
          <li>
            <Link to="/#authors">Authors</Link>
          </li>
          <li className="transient">
            <Link to="/transient">Transient</Link>
          </li>
          <div className="nav-close" onClick={toggleMenu}>
            <IoClose />
          </div>
        </ul>
      </div>
      <div className="toggle-transient">
        <Link to="/transient">
          <button className="btn-transient">Transient</button>
        </Link>
      </div>

      <div className="nav-toggle-login" onClick={toggleMenu}>
        <IoMenu />
      </div>
    </nav>
  );
};

export default NavbarLogin;
