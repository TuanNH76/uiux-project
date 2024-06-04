import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Dashboard from '../pages/dashboard/Dashboard';
import Tracking from '../pages/tracking/Tracking';
import KPI from '../pages/kpi/KPI';
import Task from '../pages/task/Task';
import Goal from '../pages/goal/GoalPage';
import Schedule from '../pages/schedule/Schedule';
import Setting from '../pages/setting/Setting';
import { FaBars } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import GoalDetailPage from '../pages/goal/GoalDetailPage';
import KPIDetailPage from '../pages/goal/KPIDetailPage';
import '../App';

function AppRouter() {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Sidebar isCollapsed={isCollapsed} />
        <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
          <FaBars className="toggle-btn" onClick={toggleSidebar} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/kpis" element={<KPI />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/goals" element={<Goal />} />
            <Route path="/goals/:id" element={<GoalDetailPage />} />
            <Route path="/goals/:goalId/:kpiId" element={<KPIDetailPage />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;