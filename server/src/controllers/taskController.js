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

    boardDate=== today // show today tasks add todays date to boardDate
    if boardDate=== thisweek // show this week tasks add this week date to boardDate
    if boardDate=== thismonth // show this month tasks add this month date to boardDate


    const tasksToDo = await Task.find({ board: 'toDo', userId ,});
    res.status(200).json({ tasksToDo });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving tasks' });
  }
}
};

module.exports = taskController;
