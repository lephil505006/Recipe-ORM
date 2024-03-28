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
