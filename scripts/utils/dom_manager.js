/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import { displayData } from '../factories/recipes.js';

const menuingredient = document.querySelector(
  '.dropdown-menu-ingredient > .warpper-items-ingredient',
);

const menudevice = document.querySelector(
  '.dropdown-menu-device > .warpper-items-device',
);
const menutool = document.querySelector(
  // eslint-disable-next-line linebreak-style
  '.dropdown-menu-tool > .warpper-items-tool',
);
// DOM Element Ingredients
const dropdownmenuingredient = document.querySelector(
  '.dropdown-menu-ingredient',
);
const dropdowninputingredient = document.querySelector(
  '.dropdown-input-ingredient',
);
const dropdowningredient = document.querySelector('.dropdown-ingredient');
const dropdowncontaineringredient = document.querySelector(
  '.dropdown-container-ingrediant',
);
const arrowboxingredient = document.querySelector('.arrow-ingredient');
const arrowingredient = document.querySelector('.arrow-ingredient > *');

// DOM Element Device
const dropdownmenudevice = document.querySelector('.dropdown-menu-device');
const dropdowninputdevice = document.querySelector('.dropdown-input-device');
const dropdowndevice = document.querySelector('.dropdown-device');
const dropdowncontainerdevice = document.querySelector(
  '.dropdown-container-device',
);
const arrowboxdevice = document.querySelector('.arrow-device');
const arrowdevice = document.querySelector('.arrow-device > *');

// DOM Element Tool
const dropdownmenutool = document.querySelector('.dropdown-menu-tool');
const dropdowninputtool = document.querySelector('.dropdown-input-tool');
const dropdowntool = document.querySelector('.dropdown-tool');
const dropdowncontainertool = document.querySelector(
  '.dropdown-container-tool',
);
const arrowboxtool = document.querySelector('.arrow-tool');
const arrowtool = document.querySelector('.arrow-tool > *');

//  Object DOM ingredients
const ingredients = {
  dropdown: dropdowningredient,
  input: dropdowninputingredient,
  container: dropdowncontaineringredient,
  menu: dropdownmenuingredient,
  arrowbox: arrowboxingredient,
  arrow: arrowingredient,
};

//  Object DOM devices
const devices = {
  dropdown: dropdowndevice,
  input: dropdowninputdevice,
  container: dropdowncontainerdevice,
  menu: dropdownmenudevice,
  arrowbox: arrowboxdevice,
  arrow: arrowdevice,
};

//  Object DOM tools
const tools = {
  dropdown: dropdowntool,
  input: dropdowninputtool,
  container: dropdowncontainertool,
  menu: dropdownmenutool,
  arrowbox: arrowboxtool,
  arrow: arrowtool,
};

// array for objects dom
const tabfilter = [ingredients, devices, tools];

// A function who generate the behavior of dom dependent of the array tabfilter
const dropdownfilter = (tab) => {
  function open(option) {
    if (option.input.classList.contains('dropdown-input-ingredient')) {
      option.input.setAttribute('placeholder', 'Rechercher un ingredient');
    }
    if (option.input.classList.contains('dropdown-input-device')) {
      option.input.setAttribute('placeholder', 'Rechercher un appareils');
    }
    if (option.input.classList.contains('dropdown-input-tool')) {
      option.input.setAttribute('placeholder', 'Rechercher un ustensile');
    }

    option.dropdown.classList.add('full-size');
    option.menu.classList.add('show');
    option.container.classList.remove('rounded-end');
    option.arrow.classList.add('arrow-shown');
  }

  function close(option) {
    if (option.input.classList.contains('dropdown-input-ingredient')) {
      option.input.setAttribute('placeholder', 'Ingredients');
    }
    if (option.input.classList.contains('dropdown-input-device')) {
      option.input.setAttribute('placeholder', 'Appareils');
    }
    if (option.input.classList.contains('dropdown-input-tool')) {
      option.input.setAttribute('placeholder', 'Ustensiles');
    }

    option.dropdown.classList.remove('full-size');
    option.menu.classList.remove('show');
    option.container.classList.add('rounded-end');
    option.arrow.classList.remove('arrow-shown');
  }

  tab.forEach((option) => {
    option.input.addEventListener('focus', () => {
      open(option);
    });

    option.input.addEventListener('blur', () => setTimeout(() => {
      close(option);
    }, 220));

    option.arrowbox.addEventListener('click', () => {
      option.input.focus();
    });
  });
};

// Add a Tag and filter
const addTagDom = (textTag, filtertype) => {
  const filterchosen = document.querySelector('.filter-chosen');

  let color;
  if (filtertype === 'ingredient') {
    color = 'btn-primary';
  }
  if (filtertype === 'device') {
    color = 'btn-device';
  }
  if (filtertype === 'tool') {
    color = 'btn-tool';
  }

  const tag = document.createElement('button');
  tag.classList.add('btn');
  tag.classList.add('d-flex');
  tag.classList.add('align-items-center');
  tag.classList.add('tag-selected');
  tag.classList.add(color);
  const text = document.createElement('span');
  text.innerText = textTag;
  const icon = document.createElement('i');
  icon.classList.add('fa-regular');
  icon.classList.add('fa-circle-xmark');
  icon.classList.add('badge-icon');
  tag.appendChild(text);
  tag.appendChild(icon);
  tag.addEventListener('click', (e) => {
    e.target.remove();
  });

  text.addEventListener('click', (e) => {
    e.target.parentNode.remove();
  });

  icon.addEventListener('click', (e) => {
    e.target.parentNode.remove();
  });

  filterchosen.appendChild(tag);
  ingredients.input.value = '';
  devices.input.value = '';
  tools.input.value = '';
};

//  a function generate dom for the array of options and the dom menu
const renderAdvanceTagsDOM = (tags, dom) => {
  tags.forEach((tag) => {
    const link = document.createElement('a');
    link.classList.add('dropdown-item');
    link.setAttribute('href', '#');
    link.innerText = tag;
    link.addEventListener('click', (e) => {
      if (dom === menuingredient) {
        addTagDom(e.target.innerText, 'ingredient');
      }
      if (dom === menudevice) {
        addTagDom(e.target.innerText, 'device');
      }
      if (dom === menutool) {
        addTagDom(e.target.innerText, 'tool');
      }
    });
    dom.appendChild(link);
  });
};

// display tags
const getAdvanceTags = (recipes) => {
  const ingredienttags = [];
  const appliancetags = [];
  const ustensilstags = [];

  menuingredient.innerHTML = '';
  menudevice.innerHTML = '';
  menutool.innerHTML = '';

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach(({ ingredient }) => {
      const wordingredients = ingredient.charAt(0).toUpperCase()
        + ingredient.substring(1).toLowerCase();
      if (!ingredienttags.includes(wordingredients)) {
        ingredienttags.push(wordingredients);
      }
    });

    recipe.ustensils.forEach((ustensils) => {
      const wordustensils = ustensils.charAt(0).toUpperCase()
        + ustensils.substring(1).toLowerCase();
      if (!ustensilstags.includes(wordustensils)) {
        ustensilstags.push(wordustensils);
      }
    });

    const wordappliance = recipe.appliance.charAt(0).toUpperCase()
      + recipe.appliance.substring(1).toLowerCase();
    if (!appliancetags.includes(wordappliance)) {
      appliancetags.push(wordappliance);
    }
  });

  const filterchosen = document.querySelector('.filter-chosen');

  const tables = [ingredienttags, appliancetags, ustensilstags];

  tables.forEach((table) => {
    table.sort((a, b) => a.localeCompare(b));
    filterchosen.childNodes.forEach((chosentag) => {
      if (table.includes(chosentag.textContent)) {
        const index = table.indexOf(chosentag.textContent);
        table.splice(index, 1);
      }
    });
  });

  renderAdvanceTagsDOM(ingredienttags, menuingredient);
  renderAdvanceTagsDOM(appliancetags, menudevice);
  renderAdvanceTagsDOM(ustensilstags, menutool);

  const inputEvent = new Event('input');
  ingredients.input.dispatchEvent(inputEvent);
  devices.input.dispatchEvent(inputEvent);
  tools.input.dispatchEvent(inputEvent);
};

function checkWord(node, value) {
  if (!node.innerText.toLowerCase().trim().includes(value.toLowerCase().trim())) {
    node.classList.add('hide');
  } else {
    node.classList.remove('hide');
  }
}

ingredients.input.addEventListener('input', (e) => {
  const { value } = e.target;
  menuingredient.childNodes.forEach((node) => {
    checkWord(node, value);
  });
});

devices.input.addEventListener('input', (e) => {
  const { value } = e.target;
  menudevice.childNodes.forEach((node) => {
    checkWord(node, value);
  });
});

tools.input.addEventListener('input', (e) => {
  const { value } = e.target;
  menutool.childNodes.forEach((node) => {
    checkWord(node, value);
  });
});

// delete all dom card
function deleteAllCardDOM() {
  const listcard = document.querySelector('.container-cards');
  listcard.innerHTML = '';
}

//  A function that updated recipes
function updatedRecipes(recipes) {
  getAdvanceTags(recipes);
  deleteAllCardDOM();
  displayData(recipes);
}

export {
  getAdvanceTags, dropdownfilter, tabfilter, updatedRecipes,
};
