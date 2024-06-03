export class Task {
    constructor(name, description, type, progress , isCompleted,startDate, endDate) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.isCompleted = isCompleted;
        this.startDate = startDate;
        this.endDate = endDate;
        this.progress = progress;
    }
}