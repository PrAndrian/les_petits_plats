//Section - EVENT manager filters -----------------------------------------

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


//A functnion who generate the behavior of dom dependent of the array tab_filter 
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
        
            option.input.addEventListener('input', ()=>{
                console.log(option.input.value);
                if(option.input.value.length > 0){
                    option.dropdown.classList.remove('full-size');
                    option.dropdown.classList.add('inputed-size');
                }else if(!option.input.classList.contains('full-size') || option.input.classList.contains('inputed-size')){
                    option.dropdown.classList.add('full-size');
                    option.dropdown.classList.remove('inputed-size');
                }
            })
        
            option.input.addEventListener('blur', ()=>{
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
            })
        })
    });
}

dropdown_filter(tab_filter);