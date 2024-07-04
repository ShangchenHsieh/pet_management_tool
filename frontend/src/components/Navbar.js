import React from 'react';
import '../componentStylins/Navbar.css';
import icon from '../assets/cat_paw_icon.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <icon />
        <img src={icon} alt="Logo" />
      </div>
      <div className="navbar-center">
        <div className="navbar-options">
          <Link to="/">Home</Link>
          <Link to="/about">Frequent Q&A</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link> 
        </div>
      </div>
    </div>
  );
}

export default Navbar;
