import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { FaHome, FaTasks, FaChartLine, FaCalendarAlt, FaEnvelope, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';
const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <h2>EduTrack</h2>
      <List>
        <ListItem button className="sidebar-item" component={Link} to="/">
          <FaHome />
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/tracking">
          <FaChartLine />
          <ListItemText primary="Tracking" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/kpis">
          <FaTasks />
          <ListItemText primary="KPI" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/tasks">
          <FaTasks />
          <ListItemText primary="Task" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/schedule">
          <FaCalendarAlt />
          <ListItemText primary="Schedule" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/goals">
          <FaEnvelope />
          <ListItemText primary="Goal" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/evaluations">
          <FaCog />
          <ListItemText primary="Evaluation" />
        </ListItem>
        <ListItem button className="sidebar-item" component={Link} to="/setting">
          <FaCog />
          <ListItemText primary="Setting" />
        </ListItem>
      </List>
    </div>
  );
};
export default Sidebar