const Registration = require('../models/registration');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Controller to handle registration
exports.registerUser = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract data from request body
        const { name, email, password } = req.body;

        // Check if password meets minimum length requirement
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }

        // Check if email is valid
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new Registration({
            name,
            email,
            password: hashedPassword // Store hashed password in the database
        });

        // Save the user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Respond with error message
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

// Function to validate email address
function isValidEmail(email) {
    // Use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
