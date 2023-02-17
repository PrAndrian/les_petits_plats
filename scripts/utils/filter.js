const searbar = document.querySelector('.searchbar-input');

//function : when there is input in searbar and filter
function searchbarListener(){
    searbar.addEventListener('input',(e)=>{
        filter()
    })  
}

//V1) A function that filter by word in searchbar and tag
function filter(){
    const tag_selected = document.querySelectorAll('.tag-selected');
    var word = searbar.value.toLowerCase();
    var result = initial_recipes;

    if(word.length > 2)
        result = result.filter((r)=>(checkIngredient(r,word)|| r.name.toLowerCase().includes(word)|| r.description.toLowerCase().includes(word)))
    
    if(tag_selected.length != 0)
        result = filterByTag(result)

    updatedRecipes(result);
}

//V1)A function tha filter by tags of a recipes 
function filterByTag(recipes){
    const tag_selected = document.querySelectorAll('.tag-selected');
    let filtered_recipes = recipes;
    
    tag_selected.forEach(tag=>{
        let word = tag.innerText.toLowerCase();
        filtered_recipes = filtered_recipes.filter((r)=>(checkIngredient(r,word) || checkUstensil(r,word)) || r.appliance.toLowerCase().includes(word))
    })    
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