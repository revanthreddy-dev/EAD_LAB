const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// --- Custom Middleware: Log request details ---
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next(); // pass control to the next middleware/route
});

// --- Serve static files from "public" folder ---
app.use(express.static(path.join(__dirname, "public")));

// --- Routes ---

// /home route
app.get("/home", (req, res) => {
  res.send("<h1>Home Page</h1><p>Welcome to the Home page!</p><a href='/login'>Go to Login</a>");
});

// /login route
app.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1><p>Please enter your credentials.</p><a href='/home'>Go to Home</a>");
});

// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
