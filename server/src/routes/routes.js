const registerUser = require("../controllers/registrationController");
const loginUser = require("../controllers/loginController");
const taskController = require("../controllers/taskController");
const { analytics } = require("../controllers/analyticsController");
const updateSettings = require("../controllers/controllersUpdateSettings");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

// Routes 
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/addtask',verifyToken, taskController.addTask);
router.post('/gettasktodo',verifyToken, taskController.getTaskToDo);
router.post('/updateboard',verifyToken, taskController.updateBoard);
router.post('/updatesettings',verifyToken, updateSettings);
router.post('/updatechecklist', verifyToken,taskController.updateChecklist);
router.delete('/deletetask/:taskId',verifyToken, taskController.deleteTask);
router.get('/publictasks/:taskId',taskController.showPublicTasks);
router.get('/edittasksshow/:taskId',verifyToken, taskController.showPublicTasks);
router.put('/updatetask/:taskId',verifyToken, taskController.updateTask);
// Route to fetch analytics data for a specific user
router.get('/analytics/:userId',verifyToken, async (req, res) => {
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
