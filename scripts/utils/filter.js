/* eslint-disable linebreak-style */
// A function that check ingredients of a recipe
function checkIngredient(r, word) {
  let check = false;
  r.ingredients.forEach(({ ingredient }) => {
    if (ingredient.replace(/\s+/g, '').toLowerCase().includes(word)) {
      check = true;
    }
  });
  return check;
}

// A function that check ingredients of a recipe
function checkUstensil(r, word) {
  let check = false;
  r.ustensils.forEach((ustensil) => {
    if (ustensil.replace(/\s+/g, '').toLowerCase().includes(word)) {
      check = true;
    }
  });
  return check;
}

// V1) A function that filter by word in searchba
function filterBySearching(recipes, word) {
  let result = recipes;
  const wordCompared = word.replace(/\s+/g, '').toLowerCase();
  result = result.filter((r) => checkIngredient(r, wordCompared) || r.name.replace(/\s+/g, '').toLowerCase().includes(wordCompared) || r.description.replace(/\s+/g, '').toLowerCase().includes(wordCompared));

  return result;
}

// A function tha filter by tags of a recipes
function filterByTag(recipes) {
  const tagselected = document.querySelectorAll('.tag-selected');
  let filteredrecipes = recipes;

  tagselected.forEach((tag) => {
    const word = tag.innerText.replace(/\s+/g, '').toLowerCase();
    filteredrecipes = filteredrecipes.filter(
      (r) => checkIngredient(r, word) || checkUstensil(r, word) || r.appliance.replace(/\s+/g, '').toLowerCase().includes(word),
    );
  });
  return filteredrecipes;
}

export { filterBySearching, filterByTag };
