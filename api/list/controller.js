const User = require('../schemas/userSchema'); // Adjust the path to your User model
const { LitsModel } = require('../schemas/listSchema');

const GetListsByUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate({
            path: 'lists',
            populate: {
                path: 'tasks',
                model: 'task', // matches the model name you registered
            },
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user.lists); // now includes fully populated tasks
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const getlistDetail = async (req, res) => {
    try {
        const { listId } = req.params;

        const list = await LitsModel.findOne({ _id: listId }).populate('tasks');

        if (!list) return res.status(404).json({ message: 'List not found' });

        res.json(list); // now includes full task documents
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createList = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const newList = await LitsModel.create({
            title,
            userId: user._id,
            tasks: [],
        });

        user.lists.push(newList._id);
        await user.save();

        res.status(201).json({ message: 'List created', list: newList });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateListTitle = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    try {
        const list = await LitsModel.findOneAndUpdate(
            { _id: req.params.listId },
            { title },
            { new: true }
        );

        if (!list) return res.status(404).json({ message: 'List not found' });

        res.json({ message: 'List updated', list });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const DeleteList = async (req, res) => {
    try {
        const list = await LitsModel.findOneAndDelete({
            _id: req.params.listId,
            userId: req.params.userId,
        });

        if (!list) return res.status(404).json({ message: 'List not found' });

        // Remove list ID from user.lists array
        await User.findByIdAndUpdate(req.params.userId, {
            $pull: { lists: req.params.listId },
        });

        res.json({ message: 'List deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
    GetListsByUserId,
    getlistDetail,
    createList,
    updateListTitle,
    DeleteList,
};
