import React, { useEffect, useState } from 'react';
import './Notification.css';
import { getOverdueAndUpcomingTasks } from './Noti_Ultils';

const Notification = () => {
    const [overdueTasks, setOverdueTasks] = useState([]);
    const [upcomingTasks, setUpcomingTasks] = useState([]);

    useEffect(() => {
        const goalData = JSON.parse(localStorage.getItem('goalData')) || [];
        const { overdueTasks, upcomingTasks } = getOverdueAndUpcomingTasks(goalData);
        setOverdueTasks(overdueTasks);
        setUpcomingTasks(upcomingTasks);
    }, []);

    return (
        <div className="notification">
            <h4>Overdue Tasks</h4>
            {overdueTasks.length > 0 ? (
                <ul>
                    {overdueTasks.map(task => (
                        <li key={task.id}>
                            {task.name} (Due: {new Date(task.to).toLocaleString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No overdue tasks!</p>
            )}

            <h4>Upcoming Tasks</h4>
            {upcomingTasks.length > 0 ? (
                <ul>
                    {upcomingTasks.map(task => (
                        <li key={task.id}>
                            {task.name} (Due: {new Date(task.to).toLocaleString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No upcoming tasks within the next 3 days!</p>
            )}
        </div>
    );
};

export default Notification;
