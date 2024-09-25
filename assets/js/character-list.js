import { getListItem } from './generic-list-element.js';
import { getRelatedCharacters } from './related-characters.js';
import { getObjectList } from './generic-list.js';

document.addEventListener("DOMContentLoaded", function() {
    
    window.listType = 'character';

    // Get all the related characters to this object.
    // This includes all information about the character as the characters.yml file specifies.
    // Unsorted.
    const relatedCharacters = getRelatedCharacters();

    const container = document.getElementById('character-list-container');
    container.appendChild(getObjectList(relatedCharacters));
});