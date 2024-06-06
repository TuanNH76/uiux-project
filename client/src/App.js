import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import Tracking from './pages/tracking/Tracking';
import KPI from './pages/kpi/KPI';
import Task from './pages/task/Task';
import Schedule from './pages/schedule/Schedule';
import Setting from './pages/setting/Setting';
import './App.css';
import AppRouter from './routes/AppRouter';
import { goalData } from './Data/GoalData.js';

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem('goalData', JSON.stringify(goalData));
    const storedGoalData = JSON.parse(localStorage.getItem('goalData'));
    setGoals(storedGoalData);
  }, []);

  return <AppRouter />;
}

export default App;
