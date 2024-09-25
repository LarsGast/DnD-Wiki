import { getCharacterSummaryWrapper } from './character-list-element-extension.js';

/**
 * Get a single object link element for the list.
 * @param {object} object campaign, character, location, or item
 * @returns {HTMLLIElement}
 */
export const getListItem = function(object) {
    const listItem = document.createElement('li');
    
    listItem.appendChild(getAnchorElement(object));

    return listItem;
}
/**
 * Get the anchor tag for a single location element.
 * @param {object} object campaign, character, location, or item 
 * @returns {HTMLAnchorElement}
 */
const getAnchorElement = function(object) {

    const pageLink = object.customLink ?? object.name.replace(/\s+/g, '-').toLowerCase();

    const anchor = document.createElement('a');
    anchor.href = `../${window.listType}s/${pageLink}`;
    
    // Right now, characters have a little more styling than other objects.
    if (window.listType === 'character') {
        anchor.appendChild(getCharacterSummaryWrapper(object));
    }
    else {
        anchor.textContent = object.name;
    }

    return anchor;
}