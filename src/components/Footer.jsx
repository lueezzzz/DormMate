import React from 'react'
import { socialLinks } from '@/utils/mockData';
import "../css/Footer.css"

const Footer = () => {
  return (
    <footer className="section footer bg-gradient-to-r from-orange-300 via-orange-300 to-orange-400 ">
      <ul className="footer-icons">
        {socialLinks.map((icon) => {
          return (
            <li key={icon.id}>
              <a href={icon.href} className="footer-icon">
                <i className={icon.class}></i>
              </a>
            </li>
          );
        })}
      </ul>

      <p className="copyright">
        Copyright &copy; Tech Tambayz
        <span id="date">{new Date().getFullYear()} </span> all rights reserved
      </p>
    </footer>
  );
}

export default Footer
