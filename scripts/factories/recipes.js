const recipeFactory = (data) => {
  const {
    name,
    ingredients,
    time,
    description,
  } = data;

  function getRecipeCardDOM() {
    const warpper = document.createElement('div');
    warpper.classList.add('col');

    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.setAttribute('src', 'images/plats/plat.jpg');
    image.setAttribute('alt', 'plattest');
    image.classList.add('card-img-top');

    const cardbody = document.createElement('div');
    cardbody.classList.add('card-body');

    const header = document.createElement('header');
    header.classList.add('d-flex');
    header.classList.add('justify-content-between');

    const h5 = document.createElement('h2');
    h5.classList.add('card-title');
    h5.innerText = name;

    const timer = document.createElement('div');
    timer.classList.add('timer');

    const iconclock = document.createElement('i');
    iconclock.classList.add('fa-regular');
    iconclock.classList.add('fa-clock');

    const minute = document.createElement('span');
    minute.classList.add('time');
    minute.innerText = ` ${time} min`;

    const warppertext = document.createElement('div');
    warppertext.classList.add('d-flex');
    warppertext.classList.add('justify-content-between');
    warppertext.classList.add('pt-2');

    const warpperingredient = document.createElement('ul');
    warpperingredient.classList.add('card-text');
    warpperingredient.classList.add('card-ingredients');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = document.createElement('li');
      const ingredientname = document.createElement('span');
      const ingredientquantity = document.createElement('span');

      ingredientname.classList.add('ingredient-name');
      ingredientquantity.classList.add('ingredient-quantity');

      ingredientname.innerText = ingredients[i].ingredient;

      if (ingredients[i].quantity !== undefined) { ingredientquantity.innerText = `: ${ingredients[i].quantity}`; }

      if (ingredients[i].unit !== undefined) { ingredientquantity.innerText += ` ${ingredients[i].unit}`; }

      ingredient.appendChild(ingredientname);
      ingredient.appendChild(ingredientquantity);
      warpperingredient.appendChild(ingredient);
    }

    const warpperdescription = document.createElement('p');
    warpperdescription.classList.add('card-text');
    warpperdescription.classList.add('card-text');
    warpperdescription.classList.add('card-description');
    warpperdescription.innerText = description;

    warppertext.appendChild(warpperingredient);
    warppertext.appendChild(warpperdescription);

    timer.appendChild(iconclock);
    timer.appendChild(minute);

    header.appendChild(h5);
    header.appendChild(timer);

    card.append(image);
    card.append(cardbody);
    cardbody.append(header);
    cardbody.append(warppertext);

    warpper.appendChild(card);
    return warpper;
  }

  return { getRecipeCardDOM };
};

export async function displayData(recipes) {
  const recipesSection = document.querySelector('.container-cards');

  if (recipes.length <= 0) {
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

export default { displayData };
