document
  .getElementById("addRecipeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const name = document.getElementById("recipeName").value;
    const description = document.getElementById("recipeDescription").value;
    const categoryId = document.getElementById("recipeCategory").value;

    fetch("/recipes", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, categoryId }), // Convert JavaScript object to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        document.getElementById("loadData").click(); // Reload recipes
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

document
  .getElementById("viewRecipesBtn")
  .addEventListener("click", function () {
    fetch("/recipes") // Adjust the URL based on your API's URL structure
      .then((response) => response.json())
      .then((recipes) => {
        const recipesContainer = document.getElementById("recipesContainer");
        recipesContainer.innerHTML = ""; // Clear previous content

        // Create a list of recipes
        const ul = document.createElement("ul");
        recipes.forEach((recipe) => {
          const li = document.createElement("li");
          li.textContent = `${recipe.name}: ${recipe.description}`;
          ul.appendChild(li);
        });
        recipesContainer.appendChild(ul);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  });
