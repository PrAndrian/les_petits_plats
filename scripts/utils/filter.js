async function filterBySearchbar(recipes){
    const searbar = document.querySelector('.searchbar-input');  
    let filtered_recipes = recipes;
    
    searbar.addEventListener('input',(e)=>{
        let word = e.target.value;

        if(e.target.value.length >=3 ){
            filtered_recipes = recipes.filter((r)=>(checkIngredient(r,word)|| r.name.toLowerCase().includes(word.toLowerCase())|| r.description.toLowerCase().includes(word.toLowerCase())))

            updatedRecipes(filtered_recipes)
        }else{
            updatedRecipes(recipes)
        }
    })
}

//A function that check ingredients of a recipe
function checkIngredient(r,word){
    let check = false;
    r.ingredients.forEach(({ingredient}) => {
         if(ingredient.includes(word)){
            check = true;
         }
    })
    return check;
}
//A function that check ingredients of a recipe
function checkUstensil(r,word){
    let check = false;
    r.ustensils.forEach((ustensil) => {
         if(ustensil.includes(word)){
            check = true;
         }
    })
    return check;
}
    
function filterByTag(recipes){
    const tag_selected = document.querySelectorAll('.tag-selected');
    let filtered_recipes=[];
    tag_selected.forEach(tag=>{
        filtered_recipes = recipes.filter((r)=>(checkUstensil(r,tag.innerText)) || checkIngredient(r,tag.innerText) || r.appliance == tag.innerText)
    })
    return filtered_recipes
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

