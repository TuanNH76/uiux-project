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
import { useEffect, useState } from 'react';


function App() {
  const [goals, setGoals] = useState([{
    id: 1,
    title: 'Goal 1',
    from: '2023-06-01T10:00',
    to: '2023-12-31T18:00',
    role: 'Developer',
    description: 'Complete the project',
    kpis: [
      { id: 1, name: 'KPI 1', completed: true },
      { id: 2, name: 'KPI 2', completed: false },
      { id: 3, name: 'KPI 3', completed: true },
    ],
  },
  {
    id: 2,
    title: 'Goal 2',
    from: '2023-07-01T10:00',
    to: '2023-11-30T18:00',
    role: 'Designer',
    description: 'Design the new UI',
    kpis: [
      { id: 1, name: 'KPI 1', completed: true },
      { id: 2, name: 'KPI 2', completed: true },
    ],
  },]);

  useEffect(() => {
    const storedGoalData = localStorage.getItem('goalData');
    const initialGoalData = storedGoalData ? JSON.parse(storedGoalData) : [];
    setGoals(initialGoalData);
  }, []);

  useEffect(() => {
    localStorage.setItem('goalData', JSON.stringify(goals));
  }, [goals]);

  return <AppRouter />;

}

export default App;
