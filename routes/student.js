const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Import your Student model

// GET all students
router.get('/', async(req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new student
router.post('/', async(req, res) => {
    const { studentId, firstName, lastName, course, email, phoneNumber } = req.body;

    if (!studentId || !firstName || !lastName || !course || !email || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newStudent = new Student({
        studentId,
        firstName,
        lastName,
        course,
        email,
        phoneNumber
    });

    try {
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a student
router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted' });
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ message: err.message });
    }
});


// PUT update a student
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const { studentId, firstName, lastName, course, email, phoneNumber } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, {
            studentId,
            firstName,
            lastName,
            course,
            email,
            phoneNumber
        }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET search students
router.get('/search', async(req, res) => {
    const { term } = req.query;
    try {
        const students = await Student.find({
            $or: [
                { studentId: { $regex: term, $options: 'i' } },
                { firstName: { $regex: term, $options: 'i' } },
                { lastName: { $regex: term, $options: 'i' } },
                { course: { $regex: term, $options: 'i' } },
                { email: { $regex: term, $options: 'i' } },
                { phoneNumber: { $regex: term, $options: 'i' } }
            ]
        });
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;