import React, { useState } from 'react';
import GoalList from '../../components/goal/GoalList';
import GoalForm from '../../components/goal/GoalForm';
import axios from 'axios';

const GoalPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setIsFormOpen(true);
  };

  const handleDelete = async (goalId) => {
    try {
      await axios.delete(`/api/goals/${goalId}`);
      // Refresh the list of goals (you might need to implement a function to do this)
    } catch (error) {
      console.error('Failed to delete goal', error);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedGoal(null);
  };

  const handleFormSave = () => {
    // Refresh the list of goals (you might need to implement a function to do this)
    handleFormClose();
  };

  return (
    <div>
      <GoalList onEdit={handleEdit} onDelete={handleDelete} />
      {isFormOpen && (
        <GoalForm goal={selectedGoal} onClose={handleFormClose} onSave={handleFormSave} />
      )}
    </div>
  );
};

export default GoalPage;
