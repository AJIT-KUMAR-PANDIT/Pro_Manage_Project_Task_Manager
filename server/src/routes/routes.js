const registerUser = require("../controllers/registrationController");
const loginUser = require("../controllers/loginController");

const router = require("express").Router();

// Routes 
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;