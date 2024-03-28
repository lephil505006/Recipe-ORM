const mysql = require("mysql2/promise");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "recipe_orm",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database!");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to MySQL database:", err);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something brokes!");
});

app.get("/recipes", async (req, res) => {
  try {
    console.log("Fetching recipes...");
    const [rows, fields] = await pool.query("SELECT * FROM recipes");
    console.log("Fetched recipes:", rows);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Error fetching recipes");
  }
});

//CRUD OPS
async function createRecipe(name, description, categoryId) {
  try {
    const query = `INSERT INTO recipes (name, description, categoryId) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(query, [name, description, categoryId]);
    console.log(`A new recipe has been added with ID: ${result.insertId}`);
  } catch (error) {
    console.error("Error creating a new recipe:", error);
  }
}

async function fetchRecipes() {
  try {
    const query = `SELECT * FROM recipes`;
    const [rows] = await pool.query(query);
    console.log("Fetched recipes:", rows);
    return rows;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

async function updateRecipe(id, name, description, categoryId) {
  try {
    const query = `UPDATE recipes SET name = ?, description = ?, categoryId = ? WHERE id = ?`;
    const [result] = await pool.execute(query, [
      name,
      description,
      categoryId,
      id,
    ]);
    console.log(
      `Recipe updated successfully: ${result.affectedRows} row(s) affected.`
    );
  } catch (error) {
    console.error("Error updating the recipe:", error);
  }
}

async function deleteRecipe(id) {
  try {
    const query = `DELETE FROM recipes WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    console.log(
      `Recipe deleted successfully: ${result.affectedRows} row(s) affected.`
    );
  } catch (error) {
    console.error("Error deleting the recipe:", error);
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
