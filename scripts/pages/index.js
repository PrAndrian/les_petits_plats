async function getRecipes(){
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('./data/recipes.json');
    const recipes = await response.json();
    // et bien retourner le tableau photographers seulement une fois
    return recipes;
}

async function displayData(recipes) {
    const recipesSection = document.querySelector(".container-cards");
    recipes.forEach((recipe) => {
        const recipeModel = recipeFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
};

function displayNothing() {
    const recipesSection = document.querySelector(".container-cards");
    recipesSection.innerHTML = `<span class="error">Aucune recette trouvée</span>`
    console.log(recipesSection.innerHTML)
};

async function init() {
    // Récupère les datas initial
    const {recipes} = await getRecipes();
    console.log(recipes);
    // Afficher les recettes
    displayData(recipes);
    // filtre
    filterBySearchbar(recipes);
    getAdvanceTags(recipes);
};

init();