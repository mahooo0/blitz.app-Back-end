const { default: mongoose } = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
});

const subtask = mongoose.model('subtask', subtaskSchema);
module.exports = { subtask, subtaskSchema };
