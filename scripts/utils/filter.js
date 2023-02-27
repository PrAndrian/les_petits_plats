//  V2) A function that filter by word in searchba
function filterBySearching (recipes, word) {
  const resulttmp = recipes
  const result = []
  const wordcompared = word.replace(/\s+/g, '').toLowerCase()

  for (let i = 0; i < resulttmp.length; i++) {
    const element = resulttmp[i]
    const name = element.name.replace(/\s+/g, '')
    const description = element.description.replace(/\s+/g, '')
    if (
      checkIngredient(element, wordcompared) ||
      name.toLowerCase().includes(wordcompared) ||
      description.toLowerCase().includes(wordcompared)
    ) {
      result.push(resulttmp[i])
    }
  }

  return result
}

//  A function tha filter by tags of a recipes
function filterByTag (recipes) {
  const tagselected = document.querySelectorAll('.tag-selected')
  let filteredrecipes = recipes

  tagselected.forEach((tag) => {
    const word = tag.innerText.replace(/\s+/g, '').toLowerCase()
    filteredrecipes = filteredrecipes.filter(
      (r) =>
        checkIngredient(r, word) ||
        checkUstensil(r, word) ||
        r.appliance.replace(/\s+/g, '').toLowerCase().includes(word)
    )
  })
  return filteredrecipes
}

// A function that check ingredients of a recipe
function checkIngredient (r, word) {
  let check = false
  r.ingredients.forEach(({ ingredient }) => {
    if (ingredient.replace(/\s+/g, '').toLowerCase().includes(word)) {
      check = true
    }
  })
  return check
}

// A function that check ingredients of a recipe
function checkUstensil (r, word) {
  let check = false
  r.ustensils.forEach((ustensil) => {
    if (ustensil.replace(/\s+/g, '').toLowerCase().includes(word)) {
      check = true
    }
  })
  return check
}

export { filterBySearching, filterByTag }
