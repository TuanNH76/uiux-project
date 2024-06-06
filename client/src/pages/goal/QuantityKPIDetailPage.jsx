import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';

const QuantityKPIDetailPage = () => {
    const { goalId, kpiId } = useParams();
    const [goalData, setGoalData] = useState(null);
    const [kpiData, setKpiData] = useState(null);
    const [score, setScore] = useState(0);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [timelineHeight, setTimelineHeight] = useState('0%');

    useEffect(() => {
        const storedData = localStorage.getItem('goalData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const goal = parsedData.find(goal => goal.id === goalId);
            if (goal) {
                setGoalData(goal);
                const kpi = goal.kpis.find(kpi => kpi.id === kpiId);
                if (kpi) {
                    // Set completed based on score
                    const completed = kpi.score >= 100;
                    const initialKpiData = { ...kpi, completed };
                    setKpiData(initialKpiData);

                    // Calculate and set initial score
                    const initialScore = calculateScore(initialKpiData.task, kpi.target);
                    setScore(initialScore);
                    updateTimelineHeight(initialKpiData.task);
                }
            }
        }

        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const calculateScore = (tasks, target) => {
        const completedQuantity = tasks.reduce((acc, task) => task.completed ? acc + task.quantity : acc, 0);
        const newScore = (completedQuantity / target) * 100;
        return newScore;
    };

    const handleTaskCompletion = (taskId) => {
        if (!kpiData) return;

        const updatedTasks = kpiData.task.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        const newScore = calculateScore(updatedTasks, kpiData.target);
        const completed = newScore >= 100; // Kiểm tra nếu điểm số mới đạt hoặc vượt quá 100
        setScore(newScore);

        const updatedKpiData = { ...kpiData, task: updatedTasks, score: newScore, completed };
        setKpiData(updatedKpiData);

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

    const findNearestTaskIndex = (tasks) => {
        const now = new Date();
        let nearestTaskIndex = -1;
        let smallestTimeDifference = Infinity;

        tasks.forEach((task, index) => {
            const taskEndTime = new Date(task.to);
            const timeDifference = taskEndTime - now;

            if (timeDifference >= 0 && timeDifference < smallestTimeDifference) {
                smallestTimeDifference = timeDifference;
                nearestTaskIndex = index;
            }
        });

        return nearestTaskIndex;
    };

    const updateTimelineHeight = (tasks) => {
        const now = new Date();
        const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let nearestTaskIndex = -1;

        for (let i = 0; i < tasks.length; i++) {
            const taskEndDate = new Date(tasks[i].to);
            const taskEndDay = new Date(taskEndDate.getFullYear(), taskEndDate.getMonth(), taskEndDate.getDate());
            if (taskEndDay > currentDate) {
                nearestTaskIndex = i - 1;
                break;
            }
        }

        if (nearestTaskIndex >= 0) {
            const percentage = ((nearestTaskIndex + 1) / tasks.length) * 100;
            setTimelineHeight(`${percentage}%`);
        } else {
            setTimelineHeight('100%');
        }
    };

    const scrollToNearestTask = () => {
        const tasks = kpiData.task;
        const nearestTaskIndex = findNearestTaskIndex(tasks);
        if (nearestTaskIndex !== -1) {
            const taskElement = document.getElementsByClassName("timeline-item")[nearestTaskIndex];
            if (taskElement) {
                taskElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    const renderTasks = () => {
        if (!kpiData || !kpiData.task) return null;

        return kpiData.task.map((task, index) => {
            const isOverdue = new Date(task.to) < new Date() && !task.completed;

            return (
                <div key={task.id} className="timeline-item">
                    <div className={`task-content ${task.completed ? 'completed' : isOverdue ? 'overdue' : ''}`}>
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
                                <p>End Date: {formatDate(task.to)}</p>
                                <a href={task.link} target="_blank" rel="noopener noreferrer">Link</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <p>{score.toFixed(2)}/100</p>
            <div className="kpi-chart-container">
                <div className="kpi-chart" style={{ width: `${score}%` }}></div>
            </div>
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
            <div className="tasks-container">
                <h3>Tasks</h3>
                <div className="scroll-to-nearest-task">
                    <button onClick={scrollToNearestTask}>Now</button>
                </div>
            </div>
            <div className="timeline timeline-active" style={{ '--timeline-height': timelineHeight }}>
                {renderTasks()}
            </div>
            {showScrollToTop && (
                <button className="scroll-to-top" onClick={scrollToTop}>↑</button>
            )}
        </div>
    );
};

export default QuantityKPIDetailPage;