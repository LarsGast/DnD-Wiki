import {getAbilityScoreModifier} from './util.js';

/**
 * Fills the ability scores div on a player character page.
 */
export const fillAbilityScoresDiv = function() {
    const containerDiv = document.getElementById('ability-scores-container');
    
    const elements = getAbilityScoresSectionElements();

    elements.forEach(function(element) {
        containerDiv.appendChild(element);
    });
}

/**
 * Gets all elements that should be put in the ability scores section on a PC page.
 * @returns {HTMLElement[]}
 */
const getAbilityScoresSectionElements = function() {
    return [
        getHeadingElement(),
        getAbilityScoresList()
    ];
}

/**
 * Gets the heading (h2) element for the ability scores section.
 * @returns {HTMLHeadingElement}
 */
const getHeadingElement = function() {
    const h2 = document.createElement('h2');
    h2.textContent = "Ability Scores";

    return h2;
}

/**
 * Gets the list (ul) containing all ability scores of the PC.
 * @returns {HTMLUListElement}
 */
const getAbilityScoresList = function() {
    const playerCharacterObject = window.currentObject;

    const ul = document.createElement('ul');

    ul.classList.add('no-style-list');

    ul.appendChild(getAbilityScoreListItem('STR', playerCharacterObject.strength));
    ul.appendChild(getAbilityScoreListItem('DEX', playerCharacterObject.dexterity));
    ul.appendChild(getAbilityScoreListItem('CON', playerCharacterObject.constitution));
    ul.appendChild(getAbilityScoreListItem('INT', playerCharacterObject.intelligence));
    ul.appendChild(getAbilityScoreListItem('WIS', playerCharacterObject.wisdom));
    ul.appendChild(getAbilityScoreListItem('CHA', playerCharacterObject.charisma));

    return ul;
}

/**
 * Gets the list item (li) element for a single ability score of a PC.
 * @param {string} abilityScoreName Abbreviated name of the ability score
 * @param {number} score Score value of the ability score
 * @returns {HTMLLIElement}
 */
const getAbilityScoreListItem = function(abilityScoreName, score) {

    const li = document.createElement('li');

    li.appendChild(getSpanElement(abilityScoreName));
    li.appendChild(getSpanElement(getAbilityScoreModifier(score)));
    li.appendChild(getSpanElement(score));

    return li;
}

/**
 * Get a span element with given content set as textContent.
 * @param {string} content The content to display within the span element.
 * @returns {HTMLSpanElement}
 */
const getSpanElement = function(content) {
    const span = document.createElement('span');

    span.textContent = content;

    return span;
}