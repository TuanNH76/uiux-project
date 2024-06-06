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
import ToDoKPIDetailPage from '../pages/goal/ToDoKPIDetailPage';
import QuantityKPIDetailPage from '../pages/goal/QuantityKPIDetailPage';
import WeightedKPIDetailPage from '../pages/goal/WeightedKPIDetailPage';
import NewGoalPage from '../pages/newgoal/NewGoalPage';
import Assistant from '../pages/assistant/Assistant';
import LandingPage from '../pages/landingpage/LandingPage'; // Make sure to import the LandingPage component
import '../App.css';

function AppRouter() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app/*" element={
          <>
            <Navbar />
            <div className="app-container">
              <Sidebar isCollapsed={isCollapsed} />
              <div className={`content ${isCollapsed ? 'collapsed' : ''}`}>
                <FaBars className="toggle-btn" onClick={toggleSidebar} />
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="tracking" element={<Tracking />} />
                  <Route path="kpis" element={<KPI />} />
                  <Route path="tasks" element={<Task />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="goals" element={<Goal />} />
                  <Route path="goals/:id" element={<GoalDetailPage />} />
                  <Route path="goals/:goalId/todo/:kpiId" element={<ToDoKPIDetailPage />} />
                  <Route path="goals/:goalId/quantity/:kpiId" element={<QuantityKPIDetailPage />} />
                  <Route path="goals/:goalId/weighted/:kpiId" element={<WeightedKPIDetailPage />} />
                  <Route path="newgoal" element={<NewGoalPage />} />
                  <Route path="setting" element={<Setting />} />
                  <Route path="assistant" element={<Assistant />} />
                </Routes>
              </div>
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;
