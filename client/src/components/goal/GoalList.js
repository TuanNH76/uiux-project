import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoalList = ({ onEdit, onDelete }) => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('/api/goals');
      setGoals(response.data);
    } catch (error) {
      console.error('Failed to fetch goals', error);
    }
  };

  return (
    <div>
      <h2>Goals</h2>
      <button onClick={onEdit}>Create New Goal</button>
      <ul>
        {goals.map(goal => (
          <li key={goal._id}>
            <span>{goal.name}</span>
            <button onClick={() => onEdit(goal)}>Edit</button>
            <button onClick={() => onDelete(goal._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalList;
