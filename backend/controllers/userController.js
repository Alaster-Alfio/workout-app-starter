const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.SECRET, { expiresIn: '3d' });
};

// User login handler
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        // Generate a token
        const token = generateToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// User signup handler
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.signup(email, password);
        const token = generateToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signupUser, loginUser };
