const { default: mongoose } = require('mongoose');
const { subtaskSchema } = require('./subtaskSchema');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: {
        type: String,
        enum: ['backlog', 'thisWeek', 'today', 'done'],
        default: 'backlog',
    },
    time: { type: String, match: /^\d{2}\.\d{2}\.\d{2}$/, required: true },
    subTasks: [subtaskSchema],
});
const task = mongoose.model('task', taskSchema);
module.exports = { task, taskSchema };
