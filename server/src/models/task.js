import {Schema, model} from "mongoose";

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
    start_date: Date,
    end_date: Date,
    isCompleted: {
        type: Boolean,
        default: false
    }
});

const Task = model('Task', TaskSchema);

module.exports = Task;