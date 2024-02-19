const Login = require('../models/login');

// Controller to handle login
exports.loginUser = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find the user with the provided email and password
        const user = await Login.findOne({ email, password });

        if (user) {
            // Respond with success message
            res.status(200).json({ message: 'Login successful' });
        } else {
            // Respond with error message if user not found
            res.status(404).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // Respond with error message
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
