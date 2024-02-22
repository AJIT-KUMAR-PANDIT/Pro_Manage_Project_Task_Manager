const updateSettings = require('../models/registration');
const bcrypt = require('bcrypt');

const settingsUpdate = async (req, res) => {
    const { _id, name, password, confirmPassword } = req.body;

    try {
        // If password is provided, validate and hash
        if (password) {
            // Validate password length
            if (!validatePassword(password)) {
                return res.status(400).json({ error: "Password must be at least 8 characters long." });
            }

            // Check if passwords match
            if (password !== confirmPassword) {
                return res.status(400).json({ error: "Passwords do not match. Please re-enter passwords." });
            }

            // Hash the password before updating
            const hashedPassword = await bcrypt.hash(password, 10);

            // Update with hashed password
            const result = await updateSettings.findOneAndUpdate({ _id }, {
                $set: {
                    name,
                    password: hashedPassword
                }
            }, {
                new: true
            });

            if (!result) {
                return res.status(404).json({ error: "No document found matching the _id." });
            }

            return res.status(200).json({ message: "Document updated successfully.", updatedDocument: result });
        } else {
            // If password is not provided, update only the name
            const result = await updateSettings.findOneAndUpdate({ _id }, {
                $set: {
                    name
                }
            }, {
                new: true
            });

            if (!result) {
                return res.status(404).json({ error: "No document found matching the _id." });
            }

            return res.status(200).json({ message: "Document updated successfully.", updatedDocument: result });
        }
    } catch (error) {
        console.error("Error updating document:", error);
        return res.status(500).json({ error: "An error occurred while updating the document." });
    }
};

// Function to validate password length
const validatePassword = (password) => {
    return password.length >= 8;
};

module.exports = settingsUpdate;
