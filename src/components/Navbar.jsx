import React from 'react'
import mainLogo from "../assets/images/MainLogo.png"

const Navbar = () => {
  return (
    <nav className="navbar" id='home'>
      <div className='logo'>
        <img src={mainLogo} />
        <h1 className='header1'>DormMate</h1>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#authors">Authors</a></li>
      </ul>
      <button className="btn">Light Mode/Dark Mode</button>
    </nav>
  );
}

export default Navbar
