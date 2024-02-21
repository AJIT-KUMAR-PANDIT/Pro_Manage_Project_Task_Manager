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
  // Method to get tasks with board value 'toDo' 
  getTaskToDo: async (req, res) => {
    try {
      const { userId, boardDate } = req.body;

      let startDate, endDate;

      // Determine the start and end dates based on the boardDate
      if (boardDate === 'today') {
        // Set end date to current date
        endDate = new Date();
        // Subtract 24 hours from the current date to set start date
        startDate = new Date(endDate);
        startDate.setHours(startDate.getHours() - 24);
      } else if (boardDate === 'thisWeek') {
        const today = new Date();
        const dayOfWeek = today.getDay();
        startDate = new Date(today);
        startDate.setDate(today.getDate() - dayOfWeek);
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
      } else if (boardDate === 'thisMonth') {
        const today = new Date();
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      }

      // Fetch tasks based on userId and boardDate
      const tasksToDo = await Task.find({  userId, createdDate: { $gte: startDate, $lte: endDate } });
      res.status(200).json({ tasksToDo });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving tasks' });
    }
  },

  updateBoard: async (req, res) => {
    try {
      const { taskId, newBoard } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(taskId, { board: newBoard }, { new: true });
      res.status(200).json({ message: 'Board updated successfully', task: updatedTask });
    } catch (error) {
      res.status(500).json({ error: 'Error updating board' });
    }
  }
  
};

module.exports = taskController;
