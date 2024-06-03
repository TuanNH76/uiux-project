import React from 'react';
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

function App() {

  return <AppRouter />;

}

export default App;
