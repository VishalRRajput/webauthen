const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = "mysecretkey";

// Fake user database
const user = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  user.push({ username, password: hashedPassword });
  res.json({ message: "User registered successfully!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userFound = user.find((u) => u.username == username);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, userFound.password);
  if (isMatch) {
    const token = jwt.sign({ username: userFound.username }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  } else {
    res.status(400).json({ message: "Invalid credentials!" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
