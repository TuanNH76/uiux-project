const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: { type: String, enum: ['required', 'optional'] },
    from: String,
    to: String,
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const Task = model('Task', TaskSchema);

module.exports = Task;