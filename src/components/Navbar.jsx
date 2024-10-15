import React, { useState } from "react";
import mainLogo from "../assets/images/MainLogo.png";
import "../css/Navbar.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { IoClose, IoMenu } from "react-icons/io5";

const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src={mainLogo} />
          <h1 className="header1">DormMate</h1>
        </div>
        <div className={`nav-menu ${menuOpen ? "show-menu" : ""}`}>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#authors">Authors</a>
            </li>
            <div className="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </ul>
        </div>
        <div className="color-toggle">
          <Toggle
            checked={isDark}
            onChange={({ target }) => setIsDark(target.checked)}
            aria-label="Dark mode toggle"
          />
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
