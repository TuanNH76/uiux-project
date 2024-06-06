import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';
const WeightedKPIDetailPage = () => {
    const { goalId, kpiId } = useParams();
    const storedGoalData = JSON.parse(localStorage.getItem('goalData'));
    const goalIndex = storedGoalData.findIndex(item => item.id === goalId);
    const goal = storedGoalData[goalIndex];

    const [tasks, setTasks] = useState([]);
    const [score, setScore] = useState(0); // State for KPI score


    useEffect(() => {
        if (goal) {
            const kpi = goal.kpis.find(kpi => kpi.id === kpiId);
            if (kpi) {
                const initialTasks = kpi.task;
                const sortedTasks = initialTasks.sort((a, b) => b.weight - a.weight); // Sort tasks based on weight
                setTasks(sortedTasks);

                // Calculate score immediately after sorting tasks
                const calculatedScore = calculateScore(sortedTasks);
                setScore(calculatedScore); // Set initial score from calculation
            }
        }
    }, []);

    const updateLocalStorage = (updatedGoal) => {
        const updatedGoalData = JSON.parse(localStorage.getItem('goalData')); // Reload the updated goal data
        updatedGoalData[goalIndex] = updatedGoal;
        localStorage.setItem('goalData', JSON.stringify(updatedGoalData));
    };

    const handleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        const updatedScore = calculateScore(updatedTasks);
        const completed = updatedScore >= 100;

        const updatedGoal = {
            ...goal,
            kpis: goal.kpis.map(kpi => {
                if (kpi.id === kpiId) {
                    return {
                        ...kpi,
                        task: updatedTasks, // Update tasks in the kpi
                        score: updatedScore,
                        completed: completed
                    };
                }
                return kpi;
            })
        };

        setTasks(updatedTasks); // Update the tasks state
        setScore(updatedScore); // Update the score state
        updateLocalStorage(updatedGoal);
    };

    const calculateScore = (updatedTasks) => {
        const completedTasks = updatedTasks.filter(task => task.completed);
        let completedScore = 0;
        completedTasks.forEach(task => {
            if (task.completed) {
                completedScore += task.weight;
            }
        });
        return completedScore;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (!goal) {
        return <p>Goal not found!</p>;
    }

    const kpi = goal.kpis.find(kpi => kpi.id === kpiId);
    if (!kpi) {
        return <p>KPI not found for this goal!</p>;
    }

    return (
        <div className="kpi-detail">
            <div className="nav-container">
                <div className="nav">
                    <Link to="/app/goals/">Goals</Link>
                    <span>/</span>
                    <Link to={`/app/goals/${goalId}`}>{goal.title}</Link>
                    <span>/</span>
                    <span>{kpi.name}</span>
                </div>
            </div>
            <h2>{kpi.name}</h2>
            <p>{score.toFixed(2)}/100</p>
            <div className="kpi-chart-container">
                <div className="kpi-chart" style={{ width: `${score}%` }}></div>
            </div>
            {kpi && (
                <div>
                    <p>Name: {kpi.name}</p>
                    <p>End date: {formatDate(kpi.to)}</p>
                </div>
            )}
            <h3>Tasks</h3>
            {tasks.map(task => (
                <div className="task-wrapper" key={task.id}>
                    <div className={`task-widget ${task.completed ? 'completed' : new Date(task.to) < new Date() ? 'overdue' : ''}`}>
                        <div className="task-content-container">
                            <div className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleTaskCompletion(task.id)}
                                    className="custom-checkbox"
                                />
                                <div className="score-container">
                                    <div className="task-info">
                                        <p>{task.name}</p>
                                        <p>End date: {formatDate(task.to)}</p>
                                        <a href={task.link} target="_blank" rel="noopener noreferrer">
                                            <i className="fas fa-link"></i> Link
                                        </a>
                                    </div>
                                    <p className="score">{task.weight}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WeightedKPIDetailPage;
