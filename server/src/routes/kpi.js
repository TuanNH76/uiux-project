const express = require('express');
const router = express.Router();
const { KPI } = require('../models');

// Tạo một KPI mới
router.post('/kpi/create', async (req, res) => {
    const { title, description, type, start_date, end_date, frequency, evaluations, tasks } = req.body;

    const kpi = new KPI({
        title,
        description,
        type,
        start_date,
        end_date,
        frequency,
        evaluations,
        tasks
    });

    try {
        const savedKPI = await kpi.save();
        res.json(savedKPI);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;
