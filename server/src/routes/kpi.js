const express = require('express');
const router = express.Router();
const { KPI } = require('../models');

// Create a KPI
router.post('/', async (req, res) => {
    const { title, description, type, from, to, frequency, evaluation, tasks } = req.body;
    const kpi = new KPI({ title, description, type, from, to, frequency, evaluation, tasks });
    try {
        const savedKPI = await kpi.save();
        res.json(savedKPI);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all KPIs
router.get('/', async (req, res) => {
    try {
        const kpis = await KPI.find();
        res.json(kpis);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a KPI by ID
router.get('/:id', async (req, res) => {
    try {
        const kpi = await KPI.findById(req.params.id);
        if (!kpi) return res.status(404).json({ message: 'KPI not found' });
        res.json(kpi);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a KPI
router.put('/:id', async (req, res) => {
    try {
        const updatedKPI = await KPI.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedKPI) return res.status(404).json({ message: 'KPI not found' });
        res.json(updatedKPI);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a KPI
router.delete('/:id', async (req, res) => {
    try {
        const deletedKPI = await KPI.findByIdAndDelete(req.params.id);
        if (!deletedKPI) return res.status(404).json({ message: 'KPI not found' });
        res.json({ message: 'KPI deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
