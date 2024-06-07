import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { FaHome, FaBullseye, FaRobot, FaCalendarAlt, FaPlusSquare, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';

const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <List>
        <ListItem button className="sidebar-item" component={Link} to="/app/dashboard">
          <FaHome />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/app/goals">
          <FaBullseye />
          <ListItemText primary="Goal" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/app/assistant">
          <FaRobot />
          <ListItemText primary="Assistant" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/app/schedule">
          <FaCalendarAlt />
          <ListItemText primary="Schedule" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/app/newgoal">
          <FaPlusSquare />
          <ListItemText primary="New Goal" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/app/setting">
          <FaCog />
          <ListItemText primary="Setting" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;