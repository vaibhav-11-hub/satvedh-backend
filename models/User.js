const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,      // ADD THIS
    role: String,          // student / professional
    domain: String,
    bio: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
