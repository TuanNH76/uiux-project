const express = require('express');
const router = express.Router();
const { Evaluation } = require('../models');

// Create an Evaluation
router.post('/', async (req, res) => {
    const { type, result, formula } = req.body;
    const evaluation = new Evaluation({ type, result, formula });
    try {
        const savedEvaluation = await evaluation.save();
        res.json(savedEvaluation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all Evaluations
router.get('/', async (req, res) => {
    try {
        const evaluations = await Evaluation.find();
        res.json(evaluations);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get an Evaluation by ID
router.get('/:id', async (req, res) => {
    try {
        const evaluation = await Evaluation.findById(req.params.id);
        if (!evaluation) return res.status(404).json({ message: 'Evaluation not found' });
        res.json(evaluation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an Evaluation
router.put('/:id', async (req, res) => {
    try {
        const updatedEvaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedEvaluation) return res.status(404).json({ message: 'Evaluation not found' });
        res.json(updatedEvaluation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an Evaluation
router.delete('/:id', async (req, res) => {
    try {
        const deletedEvaluation = await Evaluation.findByIdAndDelete(req.params.id);
        if (!deletedEvaluation) return res.status(404).json({ message: 'Evaluation not found' });
        res.json({ message: 'Evaluation deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
