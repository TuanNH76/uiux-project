import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { goalData } from '../../Data/GoalData';
import './KPIDetailPage.css';

const KPIDetailPage = () => {
    const { goalId, kpiId } = useParams();
    const goal = goalData.find(item => item.id === goalId);

    const [tasks, setTasks] = useState([]);
    const [selectedOptionalTasks, setSelectedOptionalTasks] = useState(0);

    useEffect(() => {
        if (goal) {
            const kpi = goal.kpis.find(kpi => kpi.id === kpiId);
            if (kpi) {
                const initialTasks = kpi.task;
                const updatedTasks = initialTasks.sort((a, b) => {
                    return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
                });
                setTasks(updatedTasks);
                setSelectedOptionalTasks(kpi.numberOfOptionalsToDo); // Initialize state with numberOfOptionalsToDo
            }
        }
    }, [goal, kpiId]);

    const handleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });

        updatedTasks.sort((a, b) => {
            return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        });

        setTasks(updatedTasks);
    };

    const countCompletedTasks = (type) => {
        const filteredTasks = tasks.filter(task => task.type === type);
        const completedTasks = filteredTasks.filter(task => task.completed);
        return `${completedTasks.length}/${filteredTasks.length}`;
    };

    const handleOptionalTaskSelection = (event) => {
        const newSelectedValue = parseInt(event.target.value);
        setSelectedOptionalTasks(newSelectedValue);

        const updatedGoal = goalData.map(g => {
            if (g.id === goalId) {
                return {
                    ...g,
                    kpis: g.kpis.map(kpi => {
                        if (kpi.id === kpiId) {
                            return {
                                ...kpi,
                                numberOfOptionalsToDo: newSelectedValue
                            };
                        }
                        return kpi;
                    })
                };
            }
            return g;
        });
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
            <div className="task-list">
                <div className="required-tasks">
                    <h3>Required Tasks ({countCompletedTasks('Required')})</h3>
                    {tasks
                        .filter(task => task.type === 'Required')
                        .map(task => (
                            <div key={task.id} className={`task-widget ${task.completed ? 'completed' : ''}`}>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleTaskCompletion(task.id)}
                                        className="custom-checkbox"
                                    />
                                    <div className="task-info">
                                        <p>{task.name}</p>
                                        <p>{task.from} - {task.to}</p>
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
                            <div key={task.id} className={`task-widget ${task.completed ? 'completed' : ''}`}>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleTaskCompletion(task.id)}
                                        className="custom-checkbox"
                                    />
                                    <div className="task-info">
                                        <p>{task.name}</p>
                                        <p>{task.from} - {task.to}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default KPIDetailPage;
