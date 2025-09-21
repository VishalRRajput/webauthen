const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Fake user database
const user = [];

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  user.push({ username, password: hashedPassword });

  res.json({ message: "User registered successfully!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
