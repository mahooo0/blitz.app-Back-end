const express = require('express');
const router = express.Router();
const { task } = require('../schemas/taskSchema');
const { LitsModel } = require('../schemas/listSchema');

// GET one task
router.get('/task-detail/:taskId', async (req, res) => {
    try {
        const tusk = await task.findOne({
            _id: req.params.taskId,
        });
        if (!tusk) return res.status(404).json({ message: 'Task not found' });
        res.json(tusk);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new task to a list
router.post('/:listId', async (req, res) => {
    const { title, status, time, subTasks = [], index } = req.body;
    if (!title || !time)
        return res.status(400).json({ message: 'Title and time are required' });

    try {
        const list = await LitsModel.findById(req.params.listId);
        if (!list) return res.status(404).json({ message: 'List not found' });
        await task.updateMany(
            {
                _id: { $in: list.tasks },
                status: status,
            },
            { $inc: { index: 1 } }
        );
        const newTask = await task.create({
            title,
            status,
            time,
            subTasks,
            index,
        });

        list.tasks.push(newTask._id);
        await list.save();

        res.status(201).json({ message: 'Task created', task: newTask });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT update a task
router.put('/update/:taskId', async (req, res) => {
    const { title, status, time, subTasks, index } = req.body;

    try {
        const Task = await task.findOneAndUpdate(
            { _id: req.params.taskId },
            { title, status, time, subTasks, index },
            { new: true }
        );

        if (!Task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task updated', Task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/drop/:listId', async (req, res) => {
    const { status, index, id } = req.body;
    const listId = req.params.listId;

    if (!status || index === undefined || !id) {
        return res
            .status(400)
            .json({ message: 'All credentials are required' });
    }

    try {
        const list = await LitsModel.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        // Step 1: Increment index of other tasks to make space
        await task.updateMany(
            {
                _id: { $in: list.tasks },
                status,
                index: { $gte: index },
                _id: { $ne: id }, // skip the task being moved
            },
            { $inc: { index: 1 } }
        );

        // Step 2: Update the task itself (status and index)
        const updatedTask = await task.findByIdAndUpdate(
            id,
            { status, index },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task to move not found' });
        }

        res.json({ message: 'Task moved and updated', task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// // DELETE a task
router.delete('/delete/:taskId', async (req, res) => {
    try {
        const Task = await task.findOneAndDelete({
            _id: req.params.taskId,
        });
        if (!Task) return res.status(404).json({ message: 'Task not found' });

        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
