// DB connexion

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;

// DB seeding
async function seedDatabase() {
  try {
    await pool.connect();
    console.log("Connected to the database");

    // query to insert data
    const query = `
      INSERT INTO books (title, author, published_date, price, stock, picture)
      VALUES 
      ('T''choupi va à la picine', 'Thierry Courtin', '1995-04-10', 4.99, 2, 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/ea/35/21/2176490/1540-1/tsp20240910075057/T-choupi-va-a-la-piscine.jpg'),
      ('Petit Ours Brun va à l''école', 'Marie Aubinais', '1990-11-17', 2, 1, 'https://m.media-amazon.com/images/I/61I8ASrp3jL._SY522_.jpg'),
      ('Petit Ours Brun est malade', 'Marie Aubinais', '1991-03-06', 2, 2, 'https://dxbyzx5id4chj.cloudfront.net/fit-in/400x400/filters:fill(fff)/pub/media/catalog/product/9/7/9782092570760ORI_fe19.jpg'),
      ('Alice Détective', 'Caroline Quine', '1930-04-28', 3.50, 4, 'https://www.babelio.com/couv/CVT_5094_682831.jpg')
    `;

    await pool.query(query);
    console.log("Data has been inserted successfully");
  } catch (error) {
    console.error("Error executing query", error.stack);
  } finally {
    await pool.end();
    console.log("Database connection closed");
  }
}

seedDatabase();
