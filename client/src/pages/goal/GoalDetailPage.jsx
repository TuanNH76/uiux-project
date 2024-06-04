import React from 'react';
import { useParams } from 'react-router-dom'; // Sử dụng useParams từ react-router-dom

import { goalData } from '../../Data/GoalData';

const GoalDetailPage = () => {
    const { id } = useParams(); // Sử dụng useParams để lấy id từ URL
    const goal = goalData.find(item => item.id === parseInt(id));

    if (!goal) {
        return <p>Goal not found!</p>;
    }

    return (
        <div>
            <h2>{goal.title}</h2>
            <p><strong>Role:</strong> {goal.role}</p>
            <p><strong>Description:</strong> {goal.description}</p>
            {/* Display other details as needed */}
        </div>
    );
};

export default GoalDetailPage;
