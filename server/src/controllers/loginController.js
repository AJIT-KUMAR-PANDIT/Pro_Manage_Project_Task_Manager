const Login = require('../models/registration');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Controller to handle login
const loginUser = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Find the user with the provided email
        const user = await Login.findOne({ email });

        if (user) {
            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                // Generate JWT token
                const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '5h' });

                // Respond with success message and token
                res.status(200).json({ message: 'Login successful', token ,userId: user._id.toString(),name: user.name });
            } else {
                // Respond with error message if password is invalid
                res.status(401).json({ message: 'Invalid email or password' });
            }
        } else {
            // Respond with error message if user not found
            res.status(404).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // Respond with error message
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

module.exports = loginUser;