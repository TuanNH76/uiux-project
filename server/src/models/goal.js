// models/Goal.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    kpis: [{ type: Schema.Types.ObjectId, ref: 'KPI'}]
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
