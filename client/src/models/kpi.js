// src/models/KPI.js
export class KPI {
    constructor(id, title, description, type, startDate, endDate, frequency, evaluations) {
        this._id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.start_date = new Date(startDate);
        this.end_date = new Date(endDate);
        this.frequency = frequency;
        this.evaluations = evaluations || [];
    }
}

export class Evaluation {
    constructor(type, result, formula = '') {
        this.type = type;
        this.result = result;
        this.formula = formula; // Công thức custom của người dùng
    }
}
