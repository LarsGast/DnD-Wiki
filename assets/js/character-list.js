import { getCharacterLinkElement } from './character-list-element.js';

document.addEventListener("DOMContentLoaded", function() {

    // Load in the name of the object of the page that we're currently on.
    const currentObjectName = window.currentObject;

    // Get all the related characters to this object.
    // This includes all information about the character as the characters.yml file specifies.
    // Unsorted.
    const relatedCharacters = getRelatedCharacters(currentObjectName);

    fillList(relatedCharacters);
});

/**
 * Get all related characters to the given character
 * @param {string} characterName Name of the character who we're currently viewing
 * @returns All characters that are related to the given one, as specified in _data/characters.yml
 */
const getRelatedCharacters = function(characterName) {
    const characterLinks = window.characterLinks;

    // Get all links to this character.
    const relatedCharacterLinks = characterLinks.filter(characterLink => 
        characterLink.firstCharacterName === characterName ||
        characterLink.secondCharacterName === characterName);
    
    // Get only the names, so we can use these to get full character objects.
    // Be sure to filter out the name of the character itself.
    let relatedCharacterNames = relatedCharacterLinks.map(characterLink => characterLink.firstCharacterName)
        .concat(relatedCharacterLinks.map(characterLink => characterLink.secondCharacterName))
        .filter(name => name !== characterName);
    
    // Remove dupes.
    relatedCharacterNames = [...new Set(relatedCharacterNames)];    
    
    // Get the actual character objects.
    // Remove invisible characters, unless we want to see them (showInvisible: true in _config.yml).
    const charactersData = window.charactersData;
    const relatedCharacters = charactersData.filter(character => 
        relatedCharacterNames.includes(character.name) &&
        (character.visible != false || window.showInvisible)
    );

    return relatedCharacters;
}

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