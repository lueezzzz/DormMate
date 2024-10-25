import React, { useState } from "react";
import mainLogo from "../assets/images/MainLogo.png";
import "../css/Navbar.css";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Button, Flowbite } from "flowbite-react";
import { navConfig } from "@/utils/mockData";

const Navbar = ({ flowbiteTheme }) => {
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
        <Flowbite theme={flowbiteTheme}>
          <Link to="/transient">
            <Button color="orangeHover" className="text-white">
              Transient
            </Button>
          </Link>
        </Flowbite>
      );
    } else {
      return (
        <Flowbite theme={flowbiteTheme}>
          <Link to="/login">
            <Button color="orangeHover" className="text-white">
              Login
            </Button>
          </Link>
        </Flowbite>
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
              <a href="#home">
                <div className="logo">
                  <img src={mainLogo} />
                  <h1 className="header1">DormMate</h1>
                </div>
              </a>
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
                    <a href={item.href}>{item.label}</a>
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
