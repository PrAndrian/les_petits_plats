import { getAdvanceTags } from "../utils/dropdown_manager.js";
import { initial_recipes, displayData } from "../pages/index.js";

// A function that filter by searching words and tags
function filter(word) {
  const tag_selected = document.querySelectorAll(".tag-selected");
  var result = initial_recipes;

  if (word.length > 2) result = filterBySearching(result, word);

  if (tag_selected.length != 0) result = filterByTag(result);

  updatedRecipes(result);
}

// V2) A function that filter by word in searchba
function filterBySearching(recipes, word) {
  let result = recipes;
  let word_compared = word.replace(/\s+/g, "");

  result = result.filter(
    (r) =>
      checkIngredient(r, word_compared) ||
      r.name.replace(/\s+/g, "").toLowerCase().includes(word_compared) ||
      r.description.replace(/\s+/g, "").toLowerCase().includes(word_compared)
  );

  return result;
}

//V1 A function tha filter by tags of a recipes
function filterByTag(recipes) {
  const tag_selected = document.querySelectorAll(".tag-selected");
  let filtered_recipes = recipes;

  tag_selected.forEach((tag) => {
    let word = tag.innerText.replace(/\s+/g, "").toLowerCase();
    filtered_recipes = filtered_recipes.filter(
      (r) =>
        checkIngredient(r, word) ||
        checkUstensil(r, word) ||
        r.appliance.replace(/\s+/g, "").toLowerCase().includes(word)
    );
  });
  return filtered_recipes;
}

//A function that check ingredients of a recipe
function checkIngredient(r, word) {
  let check = false;
  r.ingredients.forEach(({ ingredient }) => {
    if (ingredient.replace(/\s+/g, "").toLowerCase().includes(word)) {
      check = true;
    }
  });
  return check;
}

//A function that check ingredients of a recipe
function checkUstensil(r, word) {
  let check = false;
  r.ustensils.forEach((ustensil) => {
    if (ustensil.replace(/\s+/g, "").toLowerCase().includes(word)) {
      check = true;
    }
  });
  return check;
}

// A function that updated recipes
function updatedRecipes(recipes) {
  getAdvanceTags(recipes);
  deleteAllCardDOM();
  displayData(recipes);
}

//delete all dom card
function deleteAllCardDOM() {
  const list_card = document.querySelector(".container-cards");
  list_card.innerHTML = "";
}

export { filter };
