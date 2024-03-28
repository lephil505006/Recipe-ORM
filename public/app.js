document
  .getElementById("addRecipeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const recipeName = document.getElementById("recipeName").value;
    const recipeDescription =
      document.getElementById("recipeDescription").value;
    const recipeCategory = document.getElementById("recipeCategory").value;
    const ingredientInputs = document.querySelectorAll(".ingredient-input");

    const ingredients = Array.from(ingredientInputs).map((input) => {
      return {
        name: input.querySelector('[name="ingredientName[]"]').value,
        type: input.querySelector('[name="ingredientType[]"]').value,
      };
    });

    const recipeData = {
      name: recipeName,
      description: recipeDescription,
      categoryId: recipeCategory,
      ingredients: ingredients,
    };

    fetch("/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Optionally reset the form here or give feedback to the user
        // document.getElementById('addRecipeForm').reset();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Optionally inform the user that an error occurred
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
