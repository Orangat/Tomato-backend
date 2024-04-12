const express = require('express');
const router = express.Router();
const Task= require('../models/Task'); // Import the Task model

// Middleware to parse JSON bodies
router.use(express.json());

// Base path for tasks
const basePath = '/tasks';

// List all tasks
router.get(basePath, async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single task by ID
router.get(`${basePath}/:id`, getTask, (req, res) => {
    res.json(res.task);
});

// Create a new task
router.post(basePath, async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a task by ID
router.put(`${basePath}/:id`, getTask, async (req, res) => {
    if (req.body.title != null) {
        res.task.title = req.body.title;
    }
    if (req.body.description != null) {
        res.task.description = req.body.description;
    }
    try {
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task by ID
router.delete(`${basePath}/:id`, getTask, async (req, res) => {
    try {
        const result = await Task.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            res.json({ message: 'Task deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a task by ID
async function getTask(req, res, next) {
    try {
        const task = await Task.findById(req.params.id);
        if (task == null) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.task = task;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;