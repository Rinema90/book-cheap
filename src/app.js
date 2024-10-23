//Express server and routes management

const express = require("express"); //Express to determine endpoints
const pool = require("./db"); // pool import from db.js
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 8080;

// Middleware pour permettre au backend sur un port d'autoriser la communication avec le front-end sur un autre port
app.use(cors());

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
app.use("/users", usersRouter); // assigning users routes to /users : if someone asks for the users at http://localhost:8080/users, the code of users.js will be executed.
app.use("/books", booksRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
