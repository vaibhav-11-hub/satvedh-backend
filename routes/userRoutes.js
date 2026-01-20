const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, domain, bio } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ error: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            domain,
            bio
        });

        res.json({ message: "User registered", user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET PROFESSIONALS
router.get("/professionals", async (req, res) => {
    try {
        const { search, domain } = req.query;

        let query = { role: "professional" };

        if (search) query.name = { $regex: search, $options: "i" };
        if (domain) query.domain = domain;

        const pros = await User.find(query);
        res.json(pros);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
