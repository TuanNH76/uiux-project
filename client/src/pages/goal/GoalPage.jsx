import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './style.css';
Chart.register(ArcElement, Tooltip, Legend);

const GoalPage = () => {

    const [goals, setGoals] = useState([]);

    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        const storedGoalData = JSON.parse(localStorage.getItem('goalData'));
        setGoals(storedGoalData || []);
    }, []);

    const calculateKPICompletion = (kpis = []) => {
        const totalKpis = kpis.length;
        const completedKpis = kpis.filter(kpi => kpi.completed).length;
        return { totalKpis, completedKpis };
    };

    const isGoalCompleted = (goal) => {
        const { totalKpis, completedKpis } = calculateKPICompletion(goal.kpis);
        return totalKpis === completedKpis;
    };

    const renderKPIChart = (kpis) => {
        const { totalKpis, completedKpis } = calculateKPICompletion(kpis);
        const data = {
            labels: ['Completed', 'Remaining'],
            datasets: [
                {
                    data: [completedKpis, totalKpis - completedKpis],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                    hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                },
            ],
        };

        const options = {
            plugins: {
                tooltip: {
                    enabled: false,
                },
            },
            responsive: true,
            maintainAspectRatio: false,
        };

        return (
            <div className="chart-container">
                <Doughnut data={data} options={options} />
                <div className="chart-text">{completedKpis} / {totalKpis}</div>
            </div>
        );
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const completedGoals = goals.filter(isGoalCompleted);
    const incompleteGoals = goals.filter(goal => !isGoalCompleted(goal));

    const goalsToDisplay = showCompleted ? completedGoals : incompleteGoals;
    const toggleGoals = () => setShowCompleted(!showCompleted);

    return (
        <div className="goal-page">
            <div className="nav-container">
                <div className="nav">
                    Goals
                    <span>/</span>
                </div>
                <div className="button-container">
                    <button onClick={toggleGoals}>
                        {showCompleted ? 'Show Incomplete Goals' : 'Show Completed Goals'}
                    </button>
                </div>
            </div>
            <div className="goal-list">
                {goalsToDisplay.map((goal) => {
                    return (
                        <Link key={goal.id} to={`/app/goals/${goal.id}`} className="goal-link">
                            <div className="goal-widget">
                                <h4>{goal.title}</h4>
                                <p><strong>End Time:</strong> {formatDate(goal.to)}</p>
                                <p><strong>Role:</strong> {goal.role}</p>
                                {renderKPIChart(goal.kpis)}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default GoalPage;
