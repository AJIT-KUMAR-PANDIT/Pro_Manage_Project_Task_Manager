// taskController.js
const Task = require('../models/task'); // Assuming your model file is named 'task.js'

const taskController = {
  // Method to add a new task
  addTask: async (req, res) => {
    try {
      const { title, priority, checklist, dueDate, board, userId } = req.body;
      const newTask = new Task({ title, priority, checklist, dueDate, board, userId });
      await newTask.save();
      res.status(201).json({ message: 'Task added successfully', task: newTask });
    } catch (error) {
      res.status(500).json({ error: 'Error adding task' });
    }
  },

};

module.exports = taskController;
