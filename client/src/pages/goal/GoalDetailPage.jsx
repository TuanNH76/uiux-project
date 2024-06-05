import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './GoalDetailPage.css';

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
                    return (
                        <Link
                            key={kpi.id}
                            to={kpi.typeKPI === 'To-do' ? `/goals/${goal.id}/todo/${kpi.id}` : `/goals/${goal.id}/${kpi.id}`}
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
