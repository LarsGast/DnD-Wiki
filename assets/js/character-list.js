import { getCharacterLinkElement } from './character-list-element.js';
import { getRelatedCharacters } from './related-characters.js';

document.addEventListener("DOMContentLoaded", function() {

    // Get all the related characters to this object.
    // This includes all information about the character as the characters.yml file specifies.
    // Unsorted.
    const relatedCharacters = getRelatedCharacters();

    fillList(relatedCharacters);
});

/**
 * Fill the list that's displayed on the page with all the related characters.
 * @param {object[]} characters 
 */
const fillList = function(characters) {

    // Sort by name.
    characters = characters.sort((a, b) => a.name.localeCompare(b.name));

    // Fill the page with all info required for a link to all related characters.
    const uList = document.getElementsByClassName('character-list')[0];
    characters.forEach(function(character) {
        const listItem = getCharacterLinkElement(character);
        uList.appendChild(listItem);
    });
}