const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1]; // Extract token from "Bearer <token>"

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        const user = await User.findById(id).select("_id");

        if (!user) {
            throw new Error("User not found");
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = requireAuth;
