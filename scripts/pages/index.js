/* eslint-disable import/extensions */
import { displayData } from '../factories/recipes.js';
import {
  getAdvanceTags,
  dropdownfilter,
  tabfilter,
  updatedRecipes,
} from '../utils/dom_manager.js';
import {
  filterBySearching,
  filterByTag,
} from '../utils/filter.js';

const getRecipes = async () => {
  const response = await fetch('./data/recipes.json');
  const recipes = await response.json();
  return recipes;
};

const init = async () => {
  const { recipes } = await getRecipes();
  dropdownfilter(tabfilter);
  getAdvanceTags(recipes);
  displayData(recipes);

  const searchbar = document.querySelector('.searchbar > input');

  searchbar.addEventListener('input', (event) => {
    const word = event.target.value;
    let resultsearch = recipes;
    let resulttag = recipes;
    let result = recipes;

    if (word.length > 2) resultsearch = filterBySearching(result, word);

    resulttag = filterByTag(result);

    result = resultsearch.concat(resulttag);
    result = result.filter(
      (element, index) => result.indexOf(element) !== index,
    );

    updatedRecipes(result);
  });

  const tagschosenobserver = new MutationObserver((e) => {
    if (e[0].removedNodes) {
      const word = searchbar.value;
      let resultsearch = recipes;
      let resulttag = recipes;
      let result = recipes;

      if (word.length > 2) resultsearch = filterBySearching(result, word);

      resulttag = filterByTag(result);

      result = resultsearch.concat(resulttag);
      result = result.filter(
        (element, index) => result.indexOf(element) !== index,
      );

      updatedRecipes(result);
    }
  });

  tagschosenobserver.observe(document.querySelector('.filter-chosen'), {
    childList: true,
  });

  const pageAccessedByReload = (
    (window.performance.navigation && window.performance.navigation.type === 1)
      || window.performance
        .getEntriesByType('navigation')
        .map((nav) => nav.type)
        .includes('reload')
  );

  if (pageAccessedByReload) {
    const inputEvent = new Event('input');
    searchbar.dispatchEvent(inputEvent);
  }
};

init();
