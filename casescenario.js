//real life base scenario for online content management system
//user -moderator and admin
const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = "mysecretkey";

// Fake user database with roles
const users = [];

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
}

// Middleware for role-based authorization
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }
    next();
  };
}

// Register user with role
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, role });
  res.json({ message: "User registered with role successfully!" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ message: "Login successful", token });
});

// Routes with access levels
app.get("/content", authenticateToken, (req, res) => {
  res.send(`Hello ${req.user.username}, you can view content.`);
});

app.put(
  "/content",
  authenticateToken,
  authorizeRoles("moderator", "admin"),
  (req, res) => {
    res.send(`Hello ${req.user.username}, you can edit content.`);
  }
);

app.delete(
  "/content",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.send(`Hello ${req.user.username}, you can delete content.`);
  }
);

app.listen(3000, () => console.log("Server running on port 3000"));
