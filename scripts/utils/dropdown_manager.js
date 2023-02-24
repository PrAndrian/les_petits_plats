import { filter } from "./filter.js";
import { searbar } from "../pages/index.js";

//Section - EVENT manager filters -----------------------------------------
let menu_ingredient = document.querySelector(
  ".dropdown-menu-ingredient > .warpper-items-ingredient"
);
let menu_device = document.querySelector(
  ".dropdown-menu-device > .warpper-items-device"
);
let menu_tool = document.querySelector(
  ".dropdown-menu-tool > .warpper-items-tool"
);

//DOM Ingredients
const dropdown_menu_ingredient = document.querySelector(
  ".dropdown-menu-ingredient"
);
const dropdown_input_ingredient = document.querySelector(
  ".dropdown-input-ingredient"
);
const dropdown_ingredient = document.querySelector(".dropdown-ingredient");
const dropdown_container_ingredient = document.querySelector(
  ".dropdown-container-ingrediant"
);
const arrow_box_ingredient = document.querySelector(".arrow-ingredient");
const arrow_ingredient = document.querySelector(".arrow-ingredient > *");

//DOM Device
const dropdown_menu_device = document.querySelector(".dropdown-menu-device");
const dropdown_input_device = document.querySelector(".dropdown-input-device");
const dropdown_device = document.querySelector(".dropdown-device");
const dropdown_container_device = document.querySelector(
  ".dropdown-container-device"
);
const arrow_box_device = document.querySelector(".arrow-device");
const arrow_device = document.querySelector(".arrow-device > *");

//DOM Tool
const dropdown_menu_tool = document.querySelector(".dropdown-menu-tool");
const dropdown_input_tool = document.querySelector(".dropdown-input-tool");
const dropdown_tool = document.querySelector(".dropdown-tool");
const dropdown_container_tool = document.querySelector(
  ".dropdown-container-tool"
);
const arrow_box_tool = document.querySelector(".arrow-tool");
const arrow_tool = document.querySelector(".arrow-tool > *");

// Object DOM ingredients
const ingredients = {
  dropdown: dropdown_ingredient,
  input: dropdown_input_ingredient,
  container: dropdown_container_ingredient,
  menu: dropdown_menu_ingredient,
  arrow_box: arrow_box_ingredient,
  arrow: arrow_ingredient,
};

// Object DOM device
const devices = {
  dropdown: dropdown_device,
  input: dropdown_input_device,
  container: dropdown_container_device,
  menu: dropdown_menu_device,
  arrow_box: arrow_box_device,
  arrow: arrow_device,
};

// Object DOM tool
const tools = {
  dropdown: dropdown_tool,
  input: dropdown_input_tool,
  container: dropdown_container_tool,
  menu: dropdown_menu_tool,
  arrow_box: arrow_box_tool,
  arrow: arrow_tool,
};

//array for objects dom
const tab_filter = new Array(ingredients, devices, tools);

//A function who generate the behavior of dom dependent of the array tab_filter
function dropdown_filter(tab_filter) {
  tab_filter.map((option) => {
    option.input.addEventListener("focus", (e) => {
      open(option);
    });

    option.input.addEventListener("blur", (e) =>
      setTimeout(() => {
        close(option);
      }, 250)
    );

    option.arrow_box.addEventListener("click", (e) => {
      option.input.focus();
    });
  });
}

function open(option) {
  if (option === ingredients) {
    option.input.setAttribute("placeholder", "Rechercher un ingredient");
  }
  if (option === devices) {
    option.input.setAttribute("placeholder", "Rechercher un appareils");
  }
  if (option === tools) {
    option.input.setAttribute("placeholder", "Rechercher un ustensile");
  }

  option.dropdown.classList.add("full-size");
  option.menu.classList.add("show");
  option.container.classList.remove("rounded-end");
  option.arrow.classList.add("arrow-shown");
}

function close(option) {
  if (option === ingredients) {
    option.input.setAttribute("placeholder", "Ingredients");
  }
  if (option === devices) {
    option.input.setAttribute("placeholder", "Appareils");
  }
  if (option === tools) {
    option.input.setAttribute("placeholder", "Ustensiles");
  }

  option.dropdown.classList.remove("full-size");
  option.menu.classList.remove("show");
  option.container.classList.add("rounded-end");
  option.arrow.classList.remove("arrow-shown");
}

//display tags
const getAdvanceTags = (recipes) => {
  menu_ingredient.innerHTML = "";
  menu_device.innerHTML = "";
  menu_tool.innerHTML = "";

  let ingredient_tags = new Array();
  let appliance_tags = new Array();
  let ustensils_tags = new Array();

  recipes.map((recipe) => {
    recipe.ingredients.map(({ ingredient }) => {
      let word_ingredients =
        ingredient.charAt(0).toUpperCase() +
        ingredient.substring(1).toLowerCase();
      if (!ingredient_tags.includes(word_ingredients)) {
        ingredient_tags.push(word_ingredients);
      }
    });

    recipe.ustensils.map((ustensils) => {
      let word_ustensils =
        ustensils.charAt(0).toUpperCase() +
        ustensils.substring(1).toLowerCase();
      if (!ustensils_tags.includes(word_ustensils)) {
        ustensils_tags.push(word_ustensils);
      }
    });

    let word_appliance =
      recipe.appliance.charAt(0).toUpperCase() +
      recipe.appliance.substring(1).toLowerCase();
    if (!appliance_tags.includes(word_appliance)) {
      appliance_tags.push(word_appliance);
    }
  });

  let filter_chosen = document.querySelector(".filter-chosen");

  let tables = [ingredient_tags, appliance_tags, ustensils_tags];

  tables.forEach((table) => {
    table.sort();
    //not yet resolved
    filter_chosen.childNodes.forEach((chosen_tag) => {
      if (table.includes(chosen_tag.textContent)) {
        const index = table.indexOf(chosen_tag.textContent);
        table.splice(index, 1);
      }
    });
  });

  renderAdvanceTagsDOM(ingredient_tags, menu_ingredient);
  renderAdvanceTagsDOM(appliance_tags, menu_device);
  renderAdvanceTagsDOM(ustensils_tags, menu_tool);
};

// a function generate dom for the array of options and the dom menu
function renderAdvanceTagsDOM(tags, dom) {
  tags.map((tag) => {
    let link = document.createElement("a");
    link.classList.add("dropdown-item");
    link.setAttribute("href", "#");
    link.innerText = tag;
    link.addEventListener("click", (e) => {
      if (dom === menu_ingredient) {
        addTagDom(e.target.innerText, "ingredient");
      }
      if (dom === menu_device) {
        addTagDom(e.target.innerText, "device");
      }
      if (dom === menu_tool) {
        addTagDom(e.target.innerText, "tool");
      }
    });
    dom.appendChild(link);
  });
}

function addTagDom(textTag, filter_type) {
  let filter_chosen = document.querySelector(".filter-chosen");

  let color;
  if (filter_type === "ingredient") {
    color = "btn-primary";
  }
  if (filter_type === "device") {
    color = "btn-device";
  }
  if (filter_type === "tool") {
    color = "btn-tool";
  }

  let tag = document.createElement("button");
  tag.classList.add("btn");
  tag.classList.add("d-flex");
  tag.classList.add("align-items-center");
  tag.classList.add("tag-selected");
  tag.classList.add(color);
  let text = document.createElement("span");
  text.innerText = textTag;
  let icon = document.createElement("i");
  icon.classList.add("fa-regular");
  icon.classList.add("fa-circle-xmark");
  icon.classList.add("badge-icon");
  tag.appendChild(text);
  tag.appendChild(icon);
  tag.addEventListener("click", (e) => {
    e.target.remove();
    filter(searbar.value.toLowerCase());
  });

  text.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    filter(searbar.value.toLowerCase());
  });

  icon.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    filter(searbar.value.toLowerCase());
  });

  filter_chosen.appendChild(tag);
  filter(searbar.value.toLowerCase());
  ingredients.input.value = "";
  devices.input.value = "";
  tools.input.value = "";
}

ingredients.input.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  menu_ingredient.childNodes.forEach((node) => {
    checkWord(node, value);
  });
});

devices.input.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  menu_device.childNodes.forEach((node) => {
    checkWord(node, value);
  });
});

tools.input.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();
  menu_tool.childNodes.forEach((node) => {
    checkWord(node, value);
  });
});

function checkWord(node, value) {
  if (!node.innerText.toLowerCase().includes(value)) {
    node.classList.add("hide");
  } else {
    node.classList.remove("hide");
  }
}

//Execution ----------------------------------------------------------------
dropdown_filter(tab_filter);

export { getAdvanceTags };
