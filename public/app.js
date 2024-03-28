document.getElementById("loadData").addEventListener("click", function () {
  fetch("/recipes")
    .then((response) => response.json())
    .then((recipes) => {
      const listElement = document.getElementById("recipeList");
      listElement.innerHTML = "";
      recipes.forEach((recipe) => {
        const listItem = document.createElement("li");
        listItem.textContent = recipe.name;
        listElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
