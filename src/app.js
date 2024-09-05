//Serveur Express et gestion des routes

const express = require("express");
const pool = require("./db"); // importation du pool depuis db.js
require("dotenv").config();

const app = express();
const port = 8080;

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
