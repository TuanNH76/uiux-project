import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './QuantityKPIDetailPage.css';

const QuantityKPIDetailPage = () => {
    const { goalId, kpiId } = useParams();
    const [goalData, setGoalData] = useState(null);
    const [kpiData, setKpiData] = useState(null);

    useEffect(() => {
        // Fetch data or use stored data from localStorage
        const storedData = localStorage.getItem('goalData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const goal = parsedData.find(goal => goal.id === goalId);
            if (goal) {
                setGoalData(goal);
                const kpi = goal.kpis.find(kpi => kpi.id === kpiId);
                if (kpi) {
                    setKpiData(kpi);
                }
            }
        }
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Function to handle task completion
    const handleTaskCompletion = (taskId) => {
        if (!kpiData) return;

        const updatedTasks = kpiData.task.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: true };
            }
            return task;
        });

        // Update KPI data
        const updatedKpiData = { ...kpiData, task: updatedTasks, completed: true };
        setKpiData(updatedKpiData);

        // Update localStorage
        const storedData = JSON.parse(localStorage.getItem('goalData'));
        const updatedGoal = storedData.map(goal => {
            if (goal.id === goalId) {
                const updatedKpis = goal.kpis.map(kpi => {
                    if (kpi.id === kpiId) {
                        return updatedKpiData;
                    }
                    return kpi;
                });
                return { ...goal, kpis: updatedKpis };
            }
            return goal;
        });
        localStorage.setItem('goalData', JSON.stringify(updatedGoal));
    };

    // Render function for displaying tasks
    const renderTasks = () => {
        if (!kpiData || !kpiData.task) return null;

        return kpiData.task.map(task => (
            <div key={task.id} className={`task-widget ${task.completed ? 'completed' : new Date(task.to) < new Date() ? 'overdue' : ''}`}>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleTaskCompletion(task.id)}
                        className="custom-checkbox"
                    />
                    <div className="task-info">
                        <p>Name: {task.name}</p>
                        <p>Quantity: {task.quantity}</p>
                        <p>Type: {task.type}</p>
                        <p>From: {formatDate(task.from)}</p>
                        <a href={task.link} target="_blank" rel="noopener noreferrer">Link</a>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="kpi-detail">
            <div className="nav-container">
                <div className="nav">
                    <Link to="/goals">Goals</Link>
                    <span>/</span>
                    <Link to={`/goals/${goalData?.id}`}>{goalData?.title}</Link>
                    <span>/</span>
                    <span>{kpiData?.name}</span>
                </div>
            </div>
            <h2>KPI Detail</h2>
            {kpiData && (
                <div>
                    <p>Name: {kpiData.name}</p>
                    <p>End date: {formatDate(kpiData.to)}</p>
                    <p>Target: {kpiData.target}</p>
                    <p>Unit: {kpiData.unit}</p>
                    <p>Duration: {kpiData.duration}</p>
                    <p>Split: {kpiData.split}</p>
                </div>
            )}
            <h3>Tasks</h3>
            {renderTasks()}
        </div>
    );
}

export default QuantityKPIDetailPage;
