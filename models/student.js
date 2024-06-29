const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    course: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
});

module.exports = mongoose.model('Student', studentSchema);