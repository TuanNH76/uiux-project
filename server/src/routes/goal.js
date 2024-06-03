const express = require('express');
const router = express.Router();
const { Goal } = require('../models');

// Create a Goal
router.post('/', async (req, res) => {
    const { name, description, start_date, end_date, kpis } = req.body;
    const goal = new Goal({ name, description, start_date, end_date, kpis });
    try {
        const savedGoal = await goal.save();
        res.json(savedGoal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all Goals
router.get('/', async (req, res) => {
    try {
        const goals = await Goal.find().populate('kpis');
        res.json(goals);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a Goal by ID
router.get('/:id', async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id).populate('kpis');
        if (!goal) return res.status(404).json({ message: 'Goal not found' });
        res.json(goal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a Goal
router.put('/:id', async (req, res) => {
    try {
        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedGoal) return res.status(404).json({ message: 'Goal not found' });
        res.json(updatedGoal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:goalId/kpis', async (req, res) => {
    try {
      const { goalId } = req.params;
      const { kpiId } = req.body;
      const goal = await Goal.findById(goalId);
      goal.kpis.push(kpiId);
      await goal.save();
      res.status(200).send(goal);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

// Delete a Goal
router.delete('/:id', async (req, res) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
        if (!deletedGoal) return res.status(404).json({ message: 'Goal not found' });
        res.json({ message: 'Goal deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
