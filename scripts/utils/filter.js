/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
function isLowerCaseContains(text, word) {
  const lenText = text.length;
  const lenWord = word.length;
  for (let i = 0; i < lenText - lenWord + 1; i++) {
    let match = true;
    for (let j = 0; j < lenWord; j++) {
      if (text[i + j].toLowerCase() !== word[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      return true;
    }
  }
  return false;
}

function replaceSpaceToEmpty(text) {
  let result = '';
  const len = text.length;
  for (let i = 0; i < len; i++) {
    if (text[i] !== ' ') {
      result += text[i];
    }
  }
  return result;
}

function checkIngredient(recipe, word) {
  for (let i = 0; i < recipe.ingredients.length; i++) {
    const { ingredient } = recipe.ingredients[i];
    const ingredientName = replaceSpaceToEmpty(ingredient);
    if (isLowerCaseContains(ingredientName, word)) {
      return true;
    }
  }
  return false;
}

//  V2) A function that filter by word in searchbar
function filterBySearching(recipes, word) {
  const resulttmp = recipes;
  const result = [];
  const wordcompared = replaceSpaceToEmpty(word).toLowerCase();

  for (let i = 0; i < resulttmp.length; i++) {
    const element = resulttmp[i];
    const name = replaceSpaceToEmpty(element.name);
    const description = replaceSpaceToEmpty(element.description);
    if (
      checkIngredient(element, wordcompared)
      || isLowerCaseContains(name, wordcompared)
      || isLowerCaseContains(description, wordcompared)
    ) {
      result.push(resulttmp[i]);
    }
  }

  return result;
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

//  A function tha filter by tags of a recipes
function filterByTag(recipes, tagselected) {
  const tags = tagselected;
  let filteredrecipes = recipes;

  tags.forEach((tag) => {
    const word = tag.innerText.replace(/\s+/g, '').toLowerCase();
    filteredrecipes = filteredrecipes.filter((r) => checkIngredient(r, word) || checkUstensil(r, word) || r.appliance.replace(/\s+/g, '').toLowerCase().includes(word));
  });
  return filteredrecipes;
}

export { filterBySearching, filterByTag };
