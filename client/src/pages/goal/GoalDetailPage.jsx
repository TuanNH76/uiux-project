import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './style.css';

const GoalDetailPage = () => {
    const { id } = useParams(); // Lấy id từ URL
    const storedGoalData = JSON.parse(localStorage.getItem('goalData')); // Lấy dữ liệu từ localStorage
    const goal = storedGoalData.find(item => item.id === id); // Tìm mục tiêu có id tương ứng

    if (!goal) {
        return <p>Goal not found!</p>;
    }

    return (
        <div className="goal-detail">
            <div className="nav-container">
                <div className="nav">
                    <Link to="/goals">Goals</Link>
                    <span>/</span>
                    <Link to={`/goals/${goal.id}`}>{goal.title}</Link> {/* Sử dụng template string để tạo URL động */}
                </div>
            </div>
            <h2>{goal.title}</h2>
            <p><strong>Role:</strong> {goal.role}</p>
            <p><strong>Description:</strong> {goal.description}</p>
            <h3>KPIs:</h3>
            <div className="kpi-list">
                {goal.kpis.map((kpi) => {
                    let kpiLink = '';
                    switch (kpi.typeKPI) {
                        case 'To-do':
                            kpiLink = `/goals/${goal.id}/todo/${kpi.id}`;
                            break;
                        case 'Quantity':
                            kpiLink = `/goals/${goal.id}/quantity/${kpi.id}`;
                            break;
                        case 'Weighted':
                            kpiLink = `/goals/${goal.id}/weighted/${kpi.id}`;
                            break;
                        default:
                            kpiLink = `/goals/${goal.id}/${kpi.id}`;
                            break;
                    }
                    return (
                        <Link
                            key={kpi.id}
                            to={kpiLink}
                            className="goal-link"
                        >
                            <div className="kpi-widget">
                                <h4>{kpi.name}</h4>
                                <p>Number of Required Tasks: {kpi.task.filter(task => task.type === 'Required').length}</p>
                                <p>Number of Optional Tasks: {kpi.task.filter(task => task.type === 'Optional').length}</p>
                                <p>Score: {kpi.score}%</p>
                                <div className="kpi-chart-container">
                                    <div className="kpi-chart" style={{ width: `${kpi.score}%` }}></div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default GoalDetailPage;
