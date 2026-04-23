const express = require("express");

const app = express();
const PORT = 3000;

// ─── Middleware ──────────────────────────────────────────
// Parse incoming JSON request bodies
app.use(express.json());

// Custom logger middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// ─── In-Memory Data Store ───────────────────────────────
let students = [
  { id: 1, name: "Revanth Reddy", age: 21, department: "CSE" },
  { id: 2, name: "Srujan", age: 21, department: "ECE" },
  { id: 3, name: "Siri", age: 20, department: "ME" },
  { id: 4, name: "Akash", age: 20, department: "EEE" },
  { id: 5, name: "Nikhil", age: 21, department: "CSE" },
];
let nextId = 6; // auto-increment counter

// ─── Routes ─────────────────────────────────────────────

// GET / → Welcome message
app.get("/", (req, res) => {
  res.json({ message: "Student REST API — use /students endpoint" });
});

// GET /students → Fetch all students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET /students/:id → Fetch a single student by ID
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.json(student);
});

// POST /students → Add a new student
app.post("/students", (req, res) => {
  const { name, age, department } = req.body;

  // Basic validation
  if (!name || !age || !department) {
    return res
      .status(400)
      .json({ error: "All fields (name, age, department) are required" });
  }

  const newStudent = { id: nextId++, name, age, department };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id → Update an existing student
app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const { name, age, department } = req.body;

  // Update only provided fields
  if (name) student.name = name;
  if (age) student.age = age;
  if (department) student.department = department;

  res.json(student);
});

// DELETE /students/:id → Remove a student
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const removed = students.splice(index, 1);
  res.json({ message: "Student deleted", student: removed[0] });
});

// ─── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Student API running at http://localhost:${PORT}`);
});
