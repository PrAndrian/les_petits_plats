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

async function init() {
    // Récupère les datas
    const {recipes} = await getRecipes();
    // Afficher les recettes
    displayData(recipes);
    // filtre
    getOptionFilter(recipes);
};

init();