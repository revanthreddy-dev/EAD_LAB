const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const SECRET_KEY = "mysecretkey123";

// Middleware to parse JSON
app.use(express.json());

// ─── Hardcoded users (for demo) ─────────────────────────
const users = [
  { id: 1, username: "revanth", password: "pass123" },
  { id: 2, username: "admin", password: "admin123" },
];

// ─── Login Route → Generates JWT ────────────────────────
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate token (expires in 1 hour)
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
});

// ─── Middleware to verify JWT ────────────────────────────
function verifyToken(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Expected format: "Bearer <token>"
  const token = header.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next();
  });
}

// ─── Protected Route ────────────────────────────────────
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: `Welcome to the dashboard, ${req.user.username}!`,
    user: req.user,
  });
});

// ─── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`JWT Auth server running at http://localhost:${PORT}`);
});
