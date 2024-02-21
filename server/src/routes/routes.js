const registerUser = require("../controllers/registrationController");
const loginUser = require("../controllers/loginController");
const taskController = require("../controllers/taskController");

const router = require("express").Router();

// Routes 
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/addtask', taskController.addTask);
router.post('/gettasktodo', taskController.getTaskToDo);
router.post('/updateboard', taskController.updateBoard);


module.exports = router;