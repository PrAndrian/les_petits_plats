import { recipeFactory } from "../factories/recipes.js";
import { getAdvanceTags } from "../utils/dropdown_manager.js";
import { filter } from "../utils/filter.js";

async function getRecipes() {
  // Penser à remplacer par les données récupérées dans le json
  const response = await fetch("./data/recipes.json");
  const recipes = await response.json();
  // et bien retourner le tableau photographers seulement une fois
  return recipes;
}

async function displayData(recipes) {
  const recipesSection = document.querySelector(".container-cards");

  if (recipes.length <= 0) {
    const recipesSection = document.querySelector(".container-cards");
    recipesSection.innerHTML = `<span class="error">Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc.</span>`;
  } else {
    recipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCardDOM = recipeModel.getRecipeCardDOM();
      recipesSection.appendChild(recipeCardDOM);
    });
  }
}

const searbar = document.querySelector(".searchbar-input");

searbar.addEventListener("input", (e) => {
  filter(searbar.value.toLowerCase());
});

let initial_recipes;

async function init() {
  // Récupère les datas initial
  const { recipes } = await getRecipes();
  displayData(recipes);
  getAdvanceTags(recipes);
  initial_recipes = recipes;
}

init();

export { initial_recipes, searbar, displayData };
