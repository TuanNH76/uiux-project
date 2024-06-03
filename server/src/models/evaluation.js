import {Schema, model} from "mongoose";
const Schema = mongoose.Schema;

const EvaluationSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    formula: {
        type: String,
        default: ''
    }
});

const Evaluation = model('Evaluation', EvaluationSchema);

module.exports = { EvaluationSchema, Evaluation };
