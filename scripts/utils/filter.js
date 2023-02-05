const searbar = document.querySelector('.searchbar-input');

//listener of searbar
function searchbarListener(recipes){
    searbar.addEventListener('input',(e)=>{
        let word = e.target.value.toLowerCase();
        processfilter(recipes,word)
    })  
}

//A function that filter searchbar and tag constantly
async function filter(recipes){
    let word = searbar.value.toLowerCase();
    processfilter(recipes,word)
}

//A function that filter with a word
function processfilter(recipes,word){
    const tag_selected = document.querySelectorAll('.tag-selected');
    let filtered_recipes = recipes;

    if(word.length >=3 ){
        filtered_recipes = initial_recipes.filter((r)=>(checkIngredient(r,word)|| r.name.toLowerCase().includes(word.toLowerCase())|| r.description.toLowerCase().includes(word.toLowerCase())))
    }

    if (tag_selected.length > 0){
        filtered_recipes = filterByTag(initial_recipes)
    }

    if(tag_selected.length != 0 && searbar.value.length != 0){
        filtered_recipes = recipes.filter((r)=>(checkIngredient(r,word)|| r.name.toLowerCase().includes(word.toLowerCase())|| r.description.toLowerCase().includes(word.toLowerCase())))
        filtered_recipes = filterByTag(filtered_recipes)
        updatedRecipes(filtered_recipes);
    }

    updatedRecipes(filtered_recipes);
}


//A function tha filter by tags of a recipes 
function filterByTag(recipes){
    const tag_selected = document.querySelectorAll('.tag-selected');
    
    if(tag_selected.length != 0){
        let filtered_recipes=[];
        tag_selected.forEach(tag=>{
            let word = tag.innerText.toLowerCase();
            filtered_recipes = recipes.filter((r)=>(checkIngredient(r,word) || checkUstensil(r,word)) || r.appliance.toLowerCase().includes(word))
        })
        return filtered_recipes;
    }else{
        return recipes;
    }
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