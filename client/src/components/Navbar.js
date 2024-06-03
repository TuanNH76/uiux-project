import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import '../App.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">EduTrack</h1>
      </div>
      <div className="navbar-right">
        <FaBell className="navbar-icon" />
        <FaUserCircle className="navbar-icon" />
      </div>
    </div>
  );
};

export default Navbar;
        