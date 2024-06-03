// models/Goal.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    kpis: [{
        type: Schema.Types.ObjectId,
        ref: 'KPI'
    }]
});

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
