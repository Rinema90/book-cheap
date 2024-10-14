// ===============================
//      ROUTES FOR BOOKS
// ===============================

const express = require("express");
const router = express.Router();
const pool = require("../db");

// --------------------------------------
//      ROUTE TO GET ALL THE BOOKS = GET
// --------------------------------------
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM books");
    res.json(result.rows); // sends all the books
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});

// ------------------------------------
//      ROUTE TO ADD A BOOK = POST
// ------------------------------------
router.post("/", async (req, res) => {
  const { title, author, published_date, price, stock, picture } = req.body; //data of the new book to be added

  const query = `
    INSERT INTO books (title, author, published_date, price, stock, picture)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`; // "*" returns all the columns right after the insertions, which can be useful to immediately use some data. eg : ID of the new book
  //"$"" is a placeholder that breaks the query in several pieaces which protects against SQL injection.
  try {
    const result = await pool.query(query, [
      title,
      author,
      published_date,
      price,
      stock,
      picture,
    ]);
    res.status(201).json(result.rows[0]); // sends the created book
  } catch (error) {
    res.status(400).json({ message: "Error creating book" });
  }
});

// -----------------------------------------
//      ROUTE TO RETRIEVE A BOOK BY ID = GET
// -----------------------------------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(result.rows[0]); // sends the selected book
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
});

// ----------------------------------------
//      ROUTE TO FULLY UPDATE A BOOK = PUT
// ----------------------------------------

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, published_date, price, stock, picture } = req.body;

  const query = `
    UPDATE books SET title = $1, author = $2, published_date = $3, price = $4, stock = $5, picture = $6
    WHERE id = $7 RETURNING *`;

  try {
    const result = await pool.query(query, [
      title,
      author,
      published_date,
      price,
      stock,
      picture,
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(result.rows[0]); // sends the updated book
  } catch (error) {
    res.status(400).json({ message: "Error updating book" });
  }
});

// ---------------------------------------------
//      ROUTE TO PARTIALLY UPDATE A BOOK = PATCH
// ---------------------------------------------

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, published_date, price, stock, picture } = req.body;

  // SET implementation for the request to be dynamic with 2 tabs because as patch is a partial request it is necessary to check the given data first
  const fieldsToUpdate = [];
  const values = [];

  // Check every field and add the update one if match
  if (title) {
    fieldsToUpdate.push(`title = $${values.length + 1}`);
    values.push(title);
  }
  if (author) {
    fieldsToUpdate.push(`author = $${values.length + 1}`);
    values.push(author);
  }
  if (published_date) {
    fieldsToUpdate.push(`published_date = $${values.length + 1}`);
    values.push(published_date);
  }
  if (price) {
    fieldsToUpdate.push(`price = $${values.length + 1}`);
    values.push(price);
  }
  if (stock) {
    fieldsToUpdate.push(`stock = $${values.length + 1}`);
    values.push(stock);
  }
  if (picture) {
    fieldsToUpdate.push(`picture = $${values.length + 1}`);
    values.push(picture);
  }

  // if none of the fields is provided, send an error
  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  const query = `
      UPDATE books SET ${fieldsToUpdate.join(", ")}
      WHERE id = $${values.length + 1} RETURNING *`;

  try {
    // ID added a the end of the values for the request
    values.push(id);

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(result.rows[0]); // send the updated book
  } catch (error) {
    res.status(400).json({ message: "Error updating book" });
  }
});

// --------------------------------------
//      ROUTE TO DELETE A BOOK = DELETE
// --------------------------------------

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
});

module.exports = router;
module.exports = router;
