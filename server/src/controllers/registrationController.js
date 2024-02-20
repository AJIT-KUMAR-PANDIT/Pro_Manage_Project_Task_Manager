const Registration = require('../models/registration');
const bcrypt = require('bcrypt');

// Controller to handle registration
const registerUser = async (req, res) => {
    try {

        // Extract data from request body
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 400,
                message: "All fields are required.",
            });
        }

        // Check if password meets minimum length requirement
        if (password.length < 8 && confirmPassword===password) {
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


module.exports = registerUser;