import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ToDoKPIDetailPage.css';

const ToDoKPIDetailPage = () => {
    const { goalId, kpiId } = useParams();
    const storedGoalData = JSON.parse(localStorage.getItem('goalData')); // Lấy dữ liệu từ localStorage
    const goalIndex = storedGoalData.findIndex(item => item.id === goalId);
    const goal = storedGoalData[goalIndex];

    const [tasks, setTasks] = useState([]);
    const [selectedOptionalTasks, setSelectedOptionalTasks] = useState(0);
    const [score, setScore] = useState(0); // State for KPI score

    useEffect(() => {
        if (goal) {
            const kpi = goal.kpis.find(kpi => kpi.id === kpiId);
            if (kpi) {
                const initialTasks = kpi.task;
                const updatedTasks = initialTasks.sort(sortTasks);
                setTasks(updatedTasks);
                setSelectedOptionalTasks(kpi.numberOfOptionalsToDo); // Initialize state with numberOfOptionalsToDo
                setScore(kpi.score); // Set initial score from localStorage
            }
        }
    }, []);

    useEffect(() => {
        // Update tasks from localStorage when it changes
        const updatedGoalData = JSON.parse(localStorage.getItem('goalData'));
        const goalIndex = updatedGoalData.findIndex(item => item.id === goalId);
        const goal = updatedGoalData[goalIndex];
        const kpi = goal.kpis.find(kpi => kpi.id === kpiId);
        if (kpi) {
            const initialTasks = kpi.task;
            const updatedTasks = initialTasks.sort(sortTasks);
            setTasks(updatedTasks);
            setSelectedOptionalTasks(kpi.numberOfOptionalsToDo); // Update selectedOptionalTasks
            setScore(kpi.score); // Update score
        }
    }, [localStorage.getItem('goalData')]);

    const updateLocalStorage = (updatedGoal) => {
        const updatedGoalData = JSON.parse(localStorage.getItem('goalData')); // Reload the updated goal data
        updatedGoalData[goalIndex] = updatedGoal;
        localStorage.setItem('goalData', JSON.stringify(updatedGoalData));
    };

    const sortTasks = (a, b) => {
        const now = new Date();
        const isAOverdue = new Date(a.to) < now && !a.completed;
        const isBOverdue = new Date(b.to) < now && !b.completed;

        if (isAOverdue && !isBOverdue) return -1;
        if (!isAOverdue && isBOverdue) return 1;
        if (!a.completed && b.completed) return -1;
        if (a.completed && !b.completed) return 1;
        return 0;
    };

    const handleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        updatedTasks.sort(sortTasks);

        const updatedScore = calculateScore(updatedTasks, selectedOptionalTasks);
        setTasks(updatedTasks);
        const updatedGoal = {
            ...goal,
            kpis: goal.kpis.map(kpi => {
                if (kpi.id === kpiId) {
                    return {
                        ...kpi,
                        task: updatedTasks, // Update tasks in the kpi
                        score: updatedScore,
                        completed: updatedScore >= 100
                    };
                }
                return kpi;
            })
        };
        updateLocalStorage(updatedGoal);
    };

    const countCompletedTasks = (type) => {
        const filteredTasks = tasks.filter(task => task.type === type);
        const completedTasks = filteredTasks.filter(task => task.completed);
        return `${completedTasks.length}/${filteredTasks.length}`;
    };

    const handleOptionalTaskSelection = (event) => {
        const newSelectedValue = parseInt(event.target.value);
        setSelectedOptionalTasks(newSelectedValue);

        const updatedScore = calculateScore(tasks, newSelectedValue);
        const updatedGoal = {
            ...goal,
            kpis: goal.kpis.map(kpi => {
                if (kpi.id === kpiId) {
                    return {
                        ...kpi,
                        numberOfOptionalsToDo: newSelectedValue,
                        score: updatedScore,
                        completed: updatedScore >= 100
                    };
                }
                return kpi;
            })
        };

        updateLocalStorage(updatedGoal);
    };

    const calculateScore = (tasks, numberOfOptionalsToDo) => {
        const requiredTasks = tasks.filter(task => task.type === 'Required');
        const optionalTasks = tasks.filter(task => task.type === 'Optional');
        const completedRequiredTasks = requiredTasks.filter(task => task.completed).length;
        const completedOptionalTasks = optionalTasks.filter(task => task.completed).length;

        let totalScore = 0;

        if (numberOfOptionalsToDo === 0) {
            totalScore += (completedRequiredTasks / requiredTasks.length) * 100;
            totalScore += completedOptionalTasks;
        } else {
            const requiredScore = 80 * (completedRequiredTasks / requiredTasks.length);
            let optionalScore = 0;

            if (completedOptionalTasks >= numberOfOptionalsToDo) {
                optionalScore = 20;
                optionalScore += completedOptionalTasks - numberOfOptionalsToDo;
            } else {
                optionalScore = (completedOptionalTasks / numberOfOptionalsToDo) * 20;
                optionalScore += (completedOptionalTasks - numberOfOptionalsToDo) * 1;
            }

            totalScore = requiredScore + optionalScore;
        }

        if (totalScore < 0) totalScore = 0;
        setScore(totalScore);
        return totalScore;
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

    const optionalTasks = tasks.filter(task => task.type === 'Optional');
    const totalOptionalTasks = optionalTasks.length;

    const optionalTaskOptions = [];
    for (let i = 0; i <= totalOptionalTasks; i++) {
        optionalTaskOptions.push(<option key={i} value={i}>{i}</option>);
    }

    return (
        <div className="kpi-detail">
            <div className="nav-container">
                <div className="nav">
                    <Link to="/goals">Goals</Link>
                    <span>/</span>
                    <Link to={`/goals/${goalId}`}>{goal.title}</Link>
                    <span>/</span>
                    <span>{kpi.name}</span>
                </div>
            </div>
            <h2>{kpi.name}</h2>
            <p>{score.toFixed(2)}/100</p>
            <div className="kpi-chart-container">
                <div className="kpi-chart" style={{ width: `${score}%` }}></div>
            </div>
            <div className="task-list">
                <div className="required-tasks">
                    <h3>Required Tasks ({countCompletedTasks('Required')})</h3>
                    {tasks
                        .filter(task => task.type === 'Required')
                        .map(task => (
                            <div key={task.id} className={`task-widget ${task.completed ? 'completed' : new Date(task.to) < new Date() ? 'overdue' : ''}`}>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleTaskCompletion(task.id)}
                                        className="custom-checkbox"
                                    />
                                    <div className="task-info">
                                        <p>{task.name}</p>
                                        <p>End date: {formatDate(task.to)}</p>
                                        <a href={task.link} target="_blank" rel="noopener noreferrer">
                                            <i className="fas fa-link"></i> Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="optional-tasks">
                    <h3>Optional Tasks ({countCompletedTasks('Optional')})</h3>
                    <div className="optional-tasks-select">
                        <select value={selectedOptionalTasks} onChange={handleOptionalTaskSelection}>
                            {optionalTaskOptions}
                        </select>
                        <span>/{totalOptionalTasks}</span>
                    </div>
                    {tasks
                        .filter(task => task.type === 'Optional')
                        .map(task => (
                            <div key={task.id} className={`task-widget ${task.completed ? 'completed' : new Date(task.to) < new Date() ? 'overdue' : ''}`}>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleTaskCompletion(task.id)}
                                        className="custom-checkbox"
                                    />
                                    <div className="task-info">
                                        <p>{task.name}</p>
                                        <p>End date: {formatDate(task.to)}</p>
                                        <a href={task.link} target="_blank" rel="noopener noreferrer">
                                            <i className="fas fa-link"></i> Link
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ToDoKPIDetailPage;