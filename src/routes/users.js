// ===============================
//      ROUTES FOR USERS
// ===============================

const express = require("express");
const router = express.Router();
const pool = require("../db");

// --------------------------------------
//      ROUTE TO GET ALL THE USERS = GET
// --------------------------------------
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows); // sends all the users
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ------------------------------------
//      ROUTE TO ADD A USER = POST
// ------------------------------------
router.post("/", async (req, res) => {
  const { username, email, password, picture, created_at } = req.body; //data of the new user to be added

  const query = `
    INSERT INTO users (username, email, password, picture, created_at)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`; // "*" returns all the columns right after the insertions, which can be useful to immediately use some data. eg : ID of the new user
  //"$"" is a placeholder that breaks the query in several pieces which protects against SQL injection.
  try {
    const result = await pool.query(query, [
      username,
      email,
      password,
      picture,
      created_at,
    ]);
    res.status(201).json(result.rows[0]); // sends the created user
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
});

// -----------------------------------------
//      ROUTE TO RETRIEVE A USER BY ID = GET
// -----------------------------------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]); // sends the selected user
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// ----------------------------------------
//      ROUTE TO FULLY UPDATE A USER = PUT
// ----------------------------------------

router.put("/:id", async (req, res) => {
  console.log("Received PUT request for ID:", req.params.id);
  const { id } = req.params;
  const { username, email, password, picture, created_at } = req.body;

  console.log("Request body:", req.body); // to check the data sent
  console.log("Updating user with ID:", id); // to check the ID sent

  const query = `
    UPDATE users SET username = $1, email = $2, password = $3, picture = $4, created_at = $5
    WHERE id = $6 RETURNING *`;

  try {
    const result = await pool.query(query, [
      username,
      email,
      password,
      picture,
      created_at,
      id,
    ]);

    console.log("SQL result:", result); // Log of the SQL results

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]); // sends the updated user
  } catch (error) {
    console.error("Error during SQL query:", error); // Log of the errors
    res.status(400).json({ message: "Error updating user" });
  }
});

// ---------------------------------------------
//      ROUTE TO PARTIALLY UPDATE A USER = PATCH
// ---------------------------------------------

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password, picture, created_at } = req.body;

  // SET implementation for the request to be dynamic with 2 tabs because as patch is a partial request it is necessary to check the given data first
  const fieldsToUpdate = [];
  const values = [];

  // Check every field and add the update one if match
  if (title) {
    fieldsToUpdate.push(`username = $${values.length + 1}`);
    values.push(title);
  }
  if (author) {
    fieldsToUpdate.push(`email = $${values.length + 1}`);
    values.push(author);
  }
  if (published_date) {
    fieldsToUpdate.push(`password = $${values.length + 1}`);
    values.push(published_date);
  }
  if (price) {
    fieldsToUpdate.push(`picture = $${values.length + 1}`);
    values.push(price);
  }
  if (stock) {
    fieldsToUpdate.push(`created_at = $${values.length + 1}`);
    values.push(stock);
  }

  // if none of the fields is provided, send an error
  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const query = `
      UPDATE users SET ${fieldsToUpdate.join(", ")}
      WHERE id = $${values.length + 1} RETURNING *`;

  try {
    // ID added a the end of the values for the request
    values.push(id);

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]); // send the updated user
  } catch (error) {
    console.error("Error during update:", error); // Display detailed error
    res.status(400).json({ message: "Error updating user" });
  }
});

// --------------------------------------
//      ROUTE TO DELETE A USER = DELETE
// --------------------------------------

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
module.exports = router;
