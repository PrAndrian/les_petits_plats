//Section - EVENT manager filters -----------------------------------------

let menu_ingredient = document.querySelector('.dropdown-menu-ingredient > .warpper-items-ingredient');
let menu_device = document.querySelector('.dropdown-menu-device > .warpper-items-device');
let menu_tool = document.querySelector('.dropdown-menu-tool > .warpper-items-tool');

//DOM Ingredients
const dropdown_menu_ingredient = document.querySelector('.dropdown-menu-ingredient');
const dropdown_input_ingredient = document.querySelector('.dropdown-input-ingredient');
const dropdown_ingredient = document.querySelector('.dropdown-ingredient');
const dropdown_container_ingredient = document.querySelector('.dropdown-container-ingrediant');

//DOM Device
const dropdown_menu_device = document.querySelector('.dropdown-menu-device');
const dropdown_input_device = document.querySelector('.dropdown-input-device');
const dropdown_device = document.querySelector('.dropdown-device');
const dropdown_container_device = document.querySelector('.dropdown-container-device');

//DOM Tool
const dropdown_menu_tool = document.querySelector('.dropdown-menu-tool');
const dropdown_input_tool = document.querySelector('.dropdown-input-tool');
const dropdown_tool = document.querySelector('.dropdown-tool');
const dropdown_container_tool = document.querySelector('.dropdown-container-tool');

// Object DOM ingredients
const ingredients = {
    dropdown : dropdown_ingredient,
    input : dropdown_input_ingredient,
    container : dropdown_container_ingredient,
    menu : dropdown_menu_ingredient,
}

// Object DOM device
const devices = {
    dropdown : dropdown_device,
    input : dropdown_input_device,
    container : dropdown_container_device,
    menu : dropdown_menu_device,
}

// Object DOM tool
const tools = {
    dropdown : dropdown_tool,
    input : dropdown_input_tool,
    container : dropdown_container_tool,
    menu : dropdown_menu_tool,
}

//array for objects dom
const tab_filter = new Array(ingredients,devices,tools);


//A function who generate the behavior of dom dependent of the array tab_filter 
function dropdown_filter(tab_filter) {
    tab_filter.map((option)=>{
        option.input.addEventListener('focus', ()=>{
            if(option === ingredients){
                option.input.setAttribute('placeholder','Rechercher un ingredient');
            }
            if(option === devices){
                option.input.setAttribute('placeholder','Rechercher un appareils');
            }
            if(option === tools){
                option.input.setAttribute('placeholder','Rechercher un ustensile');
            }
            option.dropdown.classList.add('full-size');
            option.menu.classList.add('show');
            option.container.classList.remove('rounded-end');
        
            function blurOption(){
                if(option === ingredients){
                    option.input.setAttribute('placeholder','Ingredients');
                }
                if(option === devices){
                    option.input.setAttribute('placeholder','Appareils');
                }
                if(option === tools){
                    option.input.setAttribute('placeholder','Ustensiles');
                }
        
                if(option.dropdown.classList.contains('full-size')){
                    option.dropdown.classList.remove('full-size');    
                }
        
                if(option.menu.classList.contains('show')){
                    option.menu.classList.remove('show');
                }
        
                if(!option.container.classList.contains('rounded-end')){
                    option.container.classList.add('rounded-end');
                }
            }
            option.input.addEventListener('blur', (e)=> setTimeout(blurOption,200))
        })
    });
}



//display tags
function getAdvanceTags(recipes){
    menu_ingredient.innerHTML = "";
    menu_device.innerHTML = "";
    menu_tool.innerHTML = "";
    
    let ingredient_tags = new Array();
    let appliance_tags = new Array();
    let ustensils_tags = new Array();
    
    recipes.map((recipe)=>{
        recipe.ingredients.map(({ingredient})=>{
            if(!ingredient_tags.includes(ingredient)){
                ingredient_tags.push(ingredient);
            }else{
                const index = ingredient_tags.indexOf(ingredient);
                ingredient_tags.splice(index, 1);
            }
        })

        recipe.ustensils.map((ustensils)=>{
            if(!ustensils_tags.includes(ustensils)){
                ustensils_tags.push(ustensils);
            }
        })

        if(!appliance_tags.includes(recipe.appliance)){
            appliance_tags.push(recipe.appliance);
        }
    })

    renderAdvanceTagsDOM(ingredient_tags,menu_ingredient);
    renderAdvanceTagsDOM(appliance_tags,menu_device);
    renderAdvanceTagsDOM(ustensils_tags,menu_tool);
    
    // a function generate dom for the array of options and the dom menu
    function renderAdvanceTagsDOM(tags,dom){
        tags.map((tag)=>{
            let link = document.createElement('a');
            link.classList.add('dropdown-item');
            link.setAttribute('href',"#");
            link.innerText = tag;
            link.addEventListener('click',e=>{
                if(dom === menu_ingredient){
                    addTagDom(e.target.innerText, "ingredient");
                }
                if(dom === menu_device){
                    addTagDom(e.target.innerText, "device");
                }
                if(dom === menu_tool){
                    addTagDom(e.target.innerText, "tool");
                }
            })
            dom.appendChild(link);
        })
    
        function addTagDom(textTag, filter_type){
            let filter_chosen = document.querySelector('.filter-chosen');
        
            let color;
            if(filter_type === "ingredient"){
                color = "btn-primary"
            }
            if(filter_type === "device"){
                color = "btn-device"
            }
            if(filter_type === "tool"){
                color = "btn-tool"
            }
        
            let tag = document.createElement("button");
            tag.classList.add("btn")
            tag.classList.add("d-flex")
            tag.classList.add("align-items-center")
            tag.classList.add("tag-selected")
            tag.classList.add(color)
            tag.addEventListener('click',e=>{
                e.target.parentNode.removeChild(e.target);
                filter(recipes)
            })
            tag.innerHTML = textTag + `<i class="fa-regular fa-circle-xmark badge-icon"></i>`
            filter_chosen.appendChild(tag);
    
            filter(recipes)
        }
    }
}

 
ingredients.input.addEventListener('input', (e)=>{
    menu_ingredient.childNodes.forEach(node=>{
        if(!node.innerText.includes(e.target.value)){
            node.classList.add("hide");
        }
    })
})


//Execution ----------------------------------------------------------------
dropdown_filter(tab_filter);