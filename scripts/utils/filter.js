/* eslint-disable no-plusplus */
function checkIngredient(r, word) {
  let check = false;
  for (let i = 0; i < r.ingredients.length; i++) {
    const ingredient = r.ingredients[i].ingredient.replace(/\s+/g, '').toLowerCase();
    const wordLength = word.length;
    const ingredientLength = ingredient.length;
    let matchCount = 0;
    for (let j = 0; j < ingredientLength; j++) {
      if (ingredient[j] === word[matchCount]) {
        matchCount++;
      } else {
        matchCount = 0;
      }
      if (matchCount === wordLength) {
        check = true;
        break;
      }
    }
    if (check) {
      break;
    }
  }
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

//  V2) A function that filter by word in searchbar
function replaceSpaces(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      result += str[i];
    }
  }
  return result;
}

function replaceSpacesToLowercase(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      result += str[i].toLowerCase();
    }
  }
  return result;
}

function lowercaseIncludes(str, word) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === word[0]) {
      let j = i + 1;
      let k = 1;
      while (k < word.length && j < str.length && str[j] === word[k]) {
        j++;
        k++;
      }
      if (k === word.length) {
        return true;
      }
    }
  }
  return false;
}

function filterBySearching(recipes, word) {
  const resulttmp = recipes;
  const result = [];
  const wordcompared = replaceSpacesToLowercase(word);

  for (let i = 0; i < resulttmp.length; i++) {
    const element = resulttmp[i];
    const name = replaceSpaces(element.name);
    const description = replaceSpaces(element.description);

    if (
      checkIngredient(element, wordcompared)
      || lowercaseIncludes(name, wordcompared)
      || lowercaseIncludes(description, wordcompared)
    ) {
      result.push(resulttmp[i]);
    }
  }

  return result;
}

//  A function tha filter by tags of a recipes
function filterByTag(recipes) {
  const tagselected = document.querySelectorAll('.tag-selected');
  let filteredrecipes = recipes;

  tagselected.forEach((tag) => {
    const word = tag.innerText.replace(/\s+/g, '').toLowerCase();
    filteredrecipes = filteredrecipes.filter(
      (r) => checkIngredient(r, word)
        || checkUstensil(r, word)
        || r.appliance.replace(/\s+/g, '').toLowerCase().includes(word),
    );
  });
  return filteredrecipes;
}

export { filterBySearching, filterByTag };
