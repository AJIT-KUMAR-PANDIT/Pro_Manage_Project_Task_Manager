const registerUser = require("../controllers/registrationController");
const loginUser = require("../controllers/loginController");
const taskController = require("../controllers/taskController");
const { analytics } = require("../controllers/analyticsController");
const updateSettings = require("../controllers/controllersUpdateSettings");

const router = require("express").Router();

// Routes 
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/addtask', taskController.addTask);
router.post('/gettasktodo', taskController.getTaskToDo);
router.post('/updateboard', taskController.updateBoard);
router.post('/updatesettings', updateSettings);
router.post('/updatechecklist', taskController.updateChecklist);
router.delete('/deletetask/:taskId', taskController.deleteTask);
router.get('/publictasks/:taskId', taskController.showPublicTasks);
router.post('/updatetask', taskController.updateTask);
// Route to fetch analytics data for a specific user
router.get('/analytics/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userData = await analytics(userId);
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching analytics data' });
    }
});


router.get('/sharelink/:taskId', async (req, res) => {
    try {
      const { taskId } = req.params;
      const shareableLink = await taskController.generateLink(taskId);
      
      res.status(200).json({ shareableLink });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating shareable link' });
    }
});


module.exports = router;
