import React from 'react';
import '../componentStylins/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src="https://st4.depositphotos.com/8742624/20180/v/450/depositphotos_201800450-stock-illustration-paw-vector-icons-transparent-background.jpg" alt="Logo" />
      </div>
      <div className="navbar-center">
        <div className="navbar-options">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
