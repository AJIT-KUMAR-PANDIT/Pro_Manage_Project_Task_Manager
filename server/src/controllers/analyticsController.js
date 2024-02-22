const Task = require('../models/task');

const analytics = async (userId) => {
  try {
    const backlogTasks = await Task.countDocuments({ userId, board: 'backlog' });
    const todoTasks = await Task.countDocuments({ userId, board: 'toDo' });
    const inProgressTasks = await Task.countDocuments({ userId, board: 'inProgress' });
    const completedTasks = await Task.countDocuments({ userId, board: 'done' });

    const lowPriorityTasks = await Task.countDocuments({ userId, priority: 'LOW PRIORITY' });
    const moderatePriorityTasks = await Task.countDocuments({ userId, priority: 'MODERATE PRIORITY' });
    const highPriorityTasks = await Task.countDocuments({ userId, priority: 'HIGH PRIORITY' });

    const dueDateTasks = await Task.countDocuments({
      userId,
      dueDate: { $ne: null, $lte: new Date() }, // Due date is not null and less than or equal to today
    });

    const analyticsData = {
      backlogTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      lowPriorityTasks,
      moderatePriorityTasks,
      highPriorityTasks,
      dueDateTasks,
    };

    return analyticsData;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw new Error('Error fetching analytics data');
  }
};

module.exports =  {analytics} ;
