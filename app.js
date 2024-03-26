const mysql = require("mysql2/promise");
const express = require("express");
const app = express();
const port = 3000;

// Create a MySQL connection pool (adjust with your own credentials)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "recipe_orm",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(express.json());
app.use(express.static("public")); // If serving static files

// Endpoint to get recipes
app.get("/recipes", async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM recipes");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching recipes");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
