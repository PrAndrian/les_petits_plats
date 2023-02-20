async function getRecipes(){
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('./data/recipes.json');
    const recipes = await response.json();
    // et bien retourner le tableau photographers seulement une fois
    return recipes;
}

async function displayData(recipes) {
    const recipesSection = document.querySelector(".container-cards");

    if(recipes.length <= 0){
        const recipesSection = document.querySelector(".container-cards");
        recipesSection.innerHTML = `<span class="error">Aucune recette ne correspond à votre critère… vous pouvez
        chercher « tarte aux pommes », « poisson », etc.</span>`
    }else{
        recipes.forEach((recipe) => {
            const recipeModel = recipeFactory(recipe);
            const recipeCardDOM = recipeModel.getRecipeCardDOM();
            recipesSection.appendChild(recipeCardDOM);
        });
    }
};

let initial_recipes;

async function init() {
    // Récupère les datas initial
    const {recipes} = await getRecipes();
    // Afficher les recettes
    displayData(recipes);
    // filtre
    searchbarListener();
    getAdvanceTags(recipes);
    initial_recipes = recipes; 
};    


init();