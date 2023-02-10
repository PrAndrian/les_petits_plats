const searbar = document.querySelector('.searchbar-input');

//function : when there is input in searbar and filter
function searchbarListener(){
    searbar.addEventListener('input',(e)=>{
        filter()
    })  
}

//A function that filter by word in searchbar and tag
function filter() {
    const tag_selected = document.querySelectorAll('.tag-selected');
    let word = searbar.value.toLowerCase();
    let result = initial_recipes;

    if (word.length > 2) {
        let filtered_result = [];
        for (let i = 0; i < result.length; i++) {
            let r = result[i];
            if (checkIngredient(r, word) || r.name.toLowerCase().includes(word) || r.description.toLowerCase().includes(word)) {
                filtered_result.push(r);
            }
        }
        result = filtered_result;
    }

    if (tag_selected.length != 0) {
        result = filterByTag(result);
    }

    updatedRecipes(result);
}



//A function tha filter by tags of a recipes 
function filterByTag(recipes){
    const tag_selected = document.querySelectorAll('.tag-selected');
    let filtered_recipes = [];
    
    for (let i = 0; i < recipes.length; i++) {
        let isValid = true;
        for (let j = 0; j < tag_selected.length; j++) {
            let word = tag_selected[j].innerText.toLowerCase();
            if (!checkIngredient(recipes[i], word) && !checkUstensil(recipes[i], word) && !recipes[i].appliance.toLowerCase().includes(word)) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            filtered_recipes.push(recipes[i]);
        }
    }
    
    return filtered_recipes;
}



//A function that check ingredients of a recipe
function checkIngredient(r,word){
    let check = false;
    r.ingredients.forEach(({ingredient}) => {
         if(ingredient.toLowerCase().includes(word)){
            check = true;
         }
    })
    return check;
}
//A function that check ingredients of a recipe
function checkUstensil(r,word){
    let check = false;
    r.ustensils.forEach((ustensil) => {
         if(ustensil.toLowerCase().includes(word)){
            check = true;
         }
    })
    return check;
}
    
//A function that updated recipes
function updatedRecipes(recipes){
    if(recipes.length === 0){
        displayNothing();
        getAdvanceTags(recipes)
    }else{
        getAdvanceTags(recipes)
        deleteAllCardDOM();
        displayData(recipes);
    }

    //delete all dom card
    function deleteAllCardDOM(){
        const list_card = document.querySelector('.container-cards');
        list_card.innerHTML = "";
    }
}