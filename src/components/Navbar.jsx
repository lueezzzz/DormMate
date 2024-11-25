import React, { useState } from "react";
import mainLogo from "../assets/images/MainLogo.png";
import "../css/Navbar.css";
import "../css/Buttons.css"
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { navConfig } from "@/utils/mockData";
import Button from "./Button";


const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const location = useLocation();

  const getNavItems = (pathname) => {
    return navConfig[pathname] || navConfig["/"];
  };

  const renderButton = () => {

    console.log("The pathname is: ",  location.pathname);

    if (location.pathname === "/") {
      return (
        <Toggle
          checked={isDark}
          onChange={({ target }) => setIsDark(target.checked)}
          aria-label="Dark mode toggle"
        />
      );
    } else if (location.pathname === "/login") {
      return (

          <Link to="/transient">
            <Button className="transient-btn text-white" text="Transient"/>
          </Link>

      );
    } else {
      return (
        <Link to="/login">
          <Button
            className="login-btn text-white"
            text="Login"
          />
        </Link>
      );
    }
  };


  return (
    <header className="header">
      <nav className="navbar">
        {location.pathname === "/" ? (
          <>
            <a href="#home">
              <div className="logo">
                <img src={mainLogo} />
                <h1 className="header1">DormMate</h1>
              </div>
            </a>
          </>
        ) : (
          <>
            <Link to="/">
              
                <div className="logo">
                  <img src={mainLogo} />
                  <h1 className="header1">DormMate</h1>
                </div>
              
            </Link>
          </>
        )}

        <div className={`nav-menu ${menuOpen ? "show-menu" : ""}`}>
          <ul
            className={`nav-links ${
              location.pathname !== "/"
                ? `nav-links-${location.pathname.substring(1)}`
                : ""
            }`}
          >
            {getNavItems(location.pathname).map((item, index) => (
              <li key={index}>
                {item.link ? (
                  <Link
                    to={item.link}
                    className={item.className ? item.className : ""}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href}>{item.label}</a>
                )}
              </li>
            ))}

            <div className="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </ul>
        </div>
        <div className="button-toggle">
          {renderButton()}
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
