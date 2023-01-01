function recipeFactory(data){
    const {id, name, servings, ingredients,time,description,appliance,ustensils} =  data;

    function getRecipeCardDOM(){
        let warpper = document.createElement("div");
        warpper.classList.add("col");
        
        let card = document.createElement("div");
        card.classList.add("card");

        let image = document.createElement("img");
        image.setAttribute("src", "images/plats/plat.jpg");
        image.setAttribute("alt", "plat_test");
        image.classList.add("card-img-top")

        let card_body = document.createElement("div");
        card_body.classList.add("card-body");

        let header = document.createElement("header");
        header.classList.add("d-flex");
        header.classList.add("justify-content-between");

        let h5 = document.createElement("h2");
        h5.classList.add("card-title");
        h5.innerText = name;
        
        let timer = document.createElement("div");
        timer.classList.add("timer");

        let icon_clock = document.createElement('i')
        icon_clock.classList.add("fa-regular");
        icon_clock.classList.add("fa-clock");
        
        let minute = document.createElement('span')
        minute.classList.add("time");
        minute.innerText = " "+time + " min"
        
        let warpper_text = document.createElement('div')
        warpper_text.classList.add("d-flex");
        warpper_text.classList.add("justify-content-between");
        warpper_text.classList.add("pt-2");

        warpper_ingredient = document.createElement('ul')
        warpper_ingredient.classList.add('card-text')
        warpper_ingredient.classList.add('card-ingredients')
        
        for(let i = 0; i<ingredients.length; i++){
            let ingredient = document.createElement('li');
            let ingredient_name = document.createElement('span');
            let ingredient_quantity = document.createElement('span');

            ingredient_name.classList.add('ingredient-name');
            ingredient_quantity.classList.add('ingredient-quantity');

            ingredient_name.innerText = ingredients[i].ingredient ;

            if(ingredients[i].quantity !=undefined)
                ingredient_quantity.innerText = ": "+ingredients[i].quantity;        
            
            if(ingredients[i].unit !=undefined)
                ingredient_quantity.innerText += " "+ingredients[i].unit;   

            ingredient.appendChild(ingredient_name);
            ingredient.appendChild(ingredient_quantity);
            warpper_ingredient.appendChild(ingredient);
        }

        let warpper_description = document.createElement("p");
        warpper_description.classList.add("card-text");
        warpper_description.classList.add("card-text");
        warpper_description.classList.add("card-description");
        warpper_description.innerText = description

        warpper_text.appendChild(warpper_ingredient);
        warpper_text.appendChild(warpper_description);

        timer.appendChild(icon_clock);
        timer.appendChild(minute);

        header.appendChild(h5);
        header.appendChild(timer);

        card.append(image);
        card.append(card_body);
        card_body.append(header);
        card_body.append(warpper_text);

        warpper.appendChild(card)
        return warpper;
    }

    return {getRecipeCardDOM}
}