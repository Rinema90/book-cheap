//Express server and routes management

const express = require("express"); //Express to determine endpoints
const pool = require("./db"); // pool import from db.js
require("dotenv").config();

const app = express();
const port = 8080;

// Middleware pour parser les requêtes http (JSON) pour être comprises par le serveur Node
app.use(express.json());

// test request to check database connexion
/* app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}); */

// Route for the home page
app.get("/", (req, res) => {
  res.send("Welcome to Book Cheap !");
});

// Routers importation
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const ordersRouter = require("./routes/orders");

// Use of the routes
app.use("/users", usersRouter); // assigning users routes /users
app.use("/books", booksRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
