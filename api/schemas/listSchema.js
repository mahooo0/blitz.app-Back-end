const { default: mongoose } = require('mongoose');
const { taskSchema } = require('./taskSchema');
const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'task' }],
});
const LitsModel = mongoose.model('List', listSchema);
module.exports = { LitsModel, listSchema };
