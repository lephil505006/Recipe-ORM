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
  res.status(500).send("Something broke!");
});

// GET route to fetch all recipes
app.get("/recipes", async (req, res) => {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM recipe_orm.recipes");
    console.log("Fetched recipes:", rows);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Error fetching recipes");
  }
});

// POST route to add a new recipe
app.post("/recipes", async (req, res) => {
  const { name, description, categoryId } = req.body;
  try {
    const query =
      "INSERT INTO recipe_orm.recipes (name, description, categoryId) VALUES (?, ?, ?)";
    const [result] = await pool.execute(query, [name, description, categoryId]);
    console.log(`A new recipe has been added with ID: ${result.insertId}`);
    res
      .status(201)
      .json({ message: "Recipe added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error adding a new recipe:", error);
    res.status(500).send("Error adding recipe");
  }
});

//CRUD OPS
async function createRecipe(name, description, categoryId) {
  try {
    const query = `INSERT INTO recipe_orm.recipes (name, description, categoryId) VALUES (?, ?, ?)`;
    const [result] = await pool.execute(query, [name, description, categoryId]);
    console.log(`A new recipe has been added with ID: ${result.insertId}`);
  } catch (error) {
    console.error("Error creating a new recipe:", error);
  }
}

app.post("/recipes", async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    await createRecipe(name, description, categoryId);
    res.status(201).json({ message: "Recipe created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating recipe", error: error.message });
  }
});

async function fetchRecipes() {
  try {
    const query = `SELECT * FROM recipe_orm.recipes`;
    const [rows] = await pool.query(query);
    console.log("Fetched recipes:", rows);
    return rows;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await fetchRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recipes", error: error.message });
  }
});

async function updateRecipe(id, name, description, categoryId) {
  try {
    const query = `UPDATE recipe_orm.recipes SET name = ?, description = ?, categoryId = ? WHERE id = ?`;
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

app.put("/recipes/:id", async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const recipeId = parseInt(req.params.id, 10);
    await updateRecipe(recipeId, name, description, categoryId);
    res.status(200).json({ message: "Recipe updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating recipe", error: error.message });
  }
});

async function deleteRecipe(id) {
  try {
    const query = `DELETE FROM recipe_orm.recipes WHERE id = ?`;
    const [result] = await pool.execute(query, [id]);
    console.log(
      `Recipe deleted successfully: ${result.affectedRows} row(s) affected.`
    );
    // Return a meaningful result, or null if no rows were affected.
    return result.affectedRows > 0;
  } catch (error) {
    console.error("Error deleting the recipe:", error);
    // Rethrow the error to let the caller handle it.
    throw error;
  }
}

app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipeId = parseInt(req.params.id, 10); // Ensure the ID is a number
    const wasDeleted = await deleteRecipe(recipeId);
    if (wasDeleted) {
      res.status(200).send(`Recipe with ID ${recipeId} has been deleted.`);
    } else {
      res.status(404).send(`Recipe with ID ${recipeId} not found.`);
    }
  } catch (error) {
    res.status(500).send("Error deleting recipe");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
