// Section - Filter DOM génération ---------------------------------------------------
// menus dom 
let menu_ingredient = document.querySelector('.dropdown-menu-ingredient > .warpper-items-ingredient');
let menu_device = document.querySelector('.dropdown-menu-device > .warpper-items-device');
let menu_tool = document.querySelector('.dropdown-menu-tool > .warpper-items-tool');

// a function generate dom for the array of options and the dom menu
function getOptionFilterDOM(options,dom){

    for(let i =0; i<options.length; i++){
        let link = document.createElement('a');
        link.classList.add('dropdown-item');
        link.setAttribute('href',"#");
        link.innerText = options[i];

        dom.appendChild(link);
    }
}

// a function wich get the value of filter optionsand execute their dom generation
function getOptionFilter(recipes){
    let options_ingredient = new Array();
    let options_appareil = new Array();
    let options_ustensil = new Array();
    recipes.forEach((recipe) =>{
        recipe.ingredients.forEach((recipeIngredient) =>{
            if(!options_ingredient.includes(recipeIngredient.ingredient)){
                options_ingredient.push(recipeIngredient.ingredient);
            }
        })
        

        if(!options_appareil.includes(recipe.appliance)){
            options_appareil.push(recipe.appliance);
        }
        

        recipe.ustensils.forEach((recipeUstensils) =>{
            if(!options_ustensil.includes(recipeUstensils)){
                options_ustensil.push(recipeUstensils);
            }
        })
    })
    getOptionFilterDOM(options_ingredient,menu_ingredient);
    getOptionFilterDOM(options_appareil,menu_device);
    getOptionFilterDOM(options_ustensil,menu_tool);
}

// Section - Filter --------------------------------------------------------

//deleta all dom card
function deleteAllCardDOM(){
    const list_card = document.querySelector('.container-cards');
    list_card.innerHTML = "";
}

// A function which generates cards results based on the main seachbar
async function filterBySearchbar(recipes){
    const searbar = document.querySelector('.searchbar-input');
    let recipes_tmp = [];

    searbar.addEventListener('input',(e)=>{
        let word = e.target.value.toLowerCase();
        if(e.target.value.length > 3){
            console.log(word);
            
            //filter cards
            recipes_tmp = recipes.filter((r)=>(r.name.toLowerCase().includes(word)))
            
            console.log(recipes)
            
            //Remove previous list of cards
            deleteAllCardDOM();
            //display cards
            displayData(recipes_tmp);
            
        }

        if(e.target.value.length <= 3){
            //Remove previous list of cards
            deleteAllCardDOM();
            //display cards
            displayData(recipes);
        }
    })
}

// A function which generates cards results based on the tags seachbars 
async function filterBytag(){

}

