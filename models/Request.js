const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    proId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    topic: String,
    details: String,
    status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
