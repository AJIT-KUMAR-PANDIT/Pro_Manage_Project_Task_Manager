// taskController.js
const Task = require('../models/task'); // Assuming your model file is named 'task.js'

const taskController = {
  // Method to add a new task
  addTask: async (req, res) => {
    try {
      const { title, priority, checklist, dueDate } = req.body;
      const newTask = new Task({ title, priority, checklist, dueDate });
      await newTask.save();
      res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
      res.status(500).json({ error: 'Error adding task' });
    }
  },

  // Method to get all tasks
  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  },

  // Method to get a single task by ID
  getSingleTask: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ task });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching task' });
    }
  },

  // Method to update a task
  updateTask: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const { title, priority, checklist, dueDate } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(taskId, { title, priority, checklist, dueDate }, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: 'Error updating task' });
    }
  },

  // Method to delete a task
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting task' });
    }
  }
};

module.exports = taskController;
