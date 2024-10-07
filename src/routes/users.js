const express = require("express"); // Express module importation (Node.js library) to create web application and API.
const router = express.Router();
const pool = require("../db"); // DB Connection

// Select all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Adding a new user
router.post("/", async (req, res) => {
  const { username, email, password, picture } = req.body;
  try {
    const query = `INSERT INTO users (username, email, password, picture, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *`;
    const values = [username, email, password, picture];
    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
