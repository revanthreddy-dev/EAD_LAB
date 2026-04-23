const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// 1. Connect to MongoDB
// Creating a database named "studentDB" locally
mongoose.connect('mongodb://127.0.0.1:27017/studentDB')
  .then(() => console.log('✅ Connected to MongoDB (studentDB)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Define Schema and Model
// Creating a collection named "students" implicitly via the model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  marks: { type: Number, required: true }
}, { versionKey: false });

const Student = mongoose.model('Student', studentSchema);

// 3. API Routes

// GET /students → Fetch all student records
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// POST /students → Add a new student
app.post('/students', async (req, res) => {
  try {
    const { name, rollNumber, department, marks } = req.body;
    
    // Create new student instance
    const newStudent = new Student({
      name,
      rollNumber,
      department,
      marks
    });

    // Save to MongoDB
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Roll number already exists' });
    }
    res.status(500).json({ error: 'Failed to add student', details: error.message });
  }
});

// PUT /students/:id → Update student details
app.put('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // findByIdAndUpdate automatically applies updates
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { 
      new: true, // Return the updated document
      runValidators: true // Enforce schema validations
    });

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student', details: error.message });
  }
});

// DELETE /students/:id → Delete a student
app.delete('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student', details: error.message });
  }
});

// 4. Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
