const { default: mongoose } = require('mongoose');
const { listSchema } = require('./listSchema');
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }], // reference list IDs
});
const User = mongoose.model('User', userSchema);
module.exports = User;
