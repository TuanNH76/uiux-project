import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import Notification from '../pages/notification/Notification'; // Adjust the import path as needed

import '../App.css';

const Navbar = () => {
  const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(prevState => !prevState);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">EduTrack</h1>
      </div>
      <div className="navbar-right">
        <div className="navbar-item" onClick={toggleNotification}>
          <FaBell className="navbar-icon" />
        </div>
        <div className="navbar-item">
          <FaUserCircle className="navbar-icon" />
        </div>
      </div>
      {showNotification && <Notification />}
    </div>
  );
};

export default Navbar;