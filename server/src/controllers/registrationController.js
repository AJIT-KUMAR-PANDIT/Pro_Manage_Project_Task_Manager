const Registration = require('../models/registration');

// Controller to handle registration
exports.registerUser = async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, password } = req.body;

        // Create a new user instance
        const newUser = new Registration({
            name,
            email,
            password
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
