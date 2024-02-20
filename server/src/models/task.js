const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['HIGH PRIORITY', 'MODERATE PRIORITY', 'LOW PRIORITY'],
        required: true
    },
    checklist: [{
        taskName: String,
        completed: {
            type: Boolean,
            default: false
        }
    }],
    dueDate: {
        type: Date
    },
    board:{
        type: String,
        enum: ['toDo', 'inProgress','done','backlog'],
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
