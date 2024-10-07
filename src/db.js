require("dotenv").config();

const { Pool } = require("pg");
const { faker } = require("@faker-js/faker"); // Faker imported to generate mock data

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;

// Function to generate a random user via Faker
function generateRandomUser() {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    picture: faker.image.avatar(),
    created_at: faker.date.recent(),
  };
}

// Function to seed data in the "books" table if the don't exist yet
async function seedBooks() {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM books");
    if (parseInt(result.rows[0].count) === 0) {
      const booksQuery = `
        INSERT INTO books (title, author, published_date, price, stock, picture)
        VALUES 
        ('T''choupi va à la piscine', 'Thierry Courtin', '1995-04-10', 4.99, 2, 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/ea/35/21/2176490/1540-1/tsp20240910075057/T-choupi-va-a-la-piscine.jpg'),
        ('Petit Ours Brun va à l''école', 'Marie Aubinais', '1990-11-17', 2, 1, 'https://m.media-amazon.com/images/I/61I8ASrp3jL._SY522_.jpg'),
        ('Petit Ours Brun est malade', 'Marie Aubinais', '1991-03-06', 2, 2, 'https://dxbyzx5id4chj.cloudfront.net/fit-in/400x400/filters:fill(fff)/pub/media/catalog/product/9/7/9782092570760ORI_fe19.jpg'),
        ('Alice Détective', 'Caroline Quine', '1930-04-28', 3.50, 4, 'https://www.babelio.com/couv/CVT_5094_682831.jpg');
      `;
      await pool.query(booksQuery);
      console.log("Books data has been inserted successfully");
    } else {
      console.log("Books data already exists, skipping insertion.");
    }
  } catch (error) {
    console.error("Error inserting books data:", error.stack);
  }
}

// Function to seed data in the "users" table if the don't exist yet
async function seedUsers() {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM users");
    if (parseInt(result.rows[0].count) === 0) {
      const users = [];
      for (let i = 0; i < 5; i++) {
        const user = generateRandomUser();
        users.push(
          `('${user.username}', '${user.email}', '${user.password}', '${
            user.picture
          }', '${user.created_at.toISOString()}')`
        );
      }
      const usersQuery = `
        INSERT INTO users (username, email, password, picture, created_at)
        VALUES ${users.join(", ")};
      `;
      await pool.query(usersQuery);
      console.log("Random users data has been inserted successfully");
    } else {
      console.log("Users data already exists, skipping insertion.");
    }
  } catch (error) {
    console.error("Error inserting users data:", error.stack);
  }
}

// Main function to seed the DB
async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Data seeding only if tables are empty
    await seedUsers();
    await seedBooks();
  } catch (error) {
    console.error("Error seeding database", error.stack);
  } finally {
    console.log("Seeding completed, pool remains open for further queries");
  }
}

seedDatabase();
