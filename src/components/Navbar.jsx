import React from 'react'
import mainLogo from "../assets/images/MainLogo.png"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className='logo'>
        <img src={mainLogo} />
        <h1 className='header1'>DormMate</h1>
      </div>
      <ul className="nav-links">
        <li><a href="">Home</a></li>
        <li><a href="">About</a></li>
        <li><a href="">Authors</a></li>
      </ul>
      <button className="btn">Light Mode/Dark Mode</button>
    </nav>
  );
}

export default Navbar
