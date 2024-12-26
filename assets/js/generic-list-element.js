import { getCharacterSummaryWrapper } from './character-list-element-extension.js';
import { getComment } from './character-item-list-element-extension.js';

/**
 * Get a single object link element for the list.
 * @param {object} object campaign, character, location, or item
 * @returns {HTMLLIElement}
 */
export const getListItem = function(object) {
    const listItem = document.createElement('li');
    
    listItem.appendChild(getAnchorElement(object));

    // Right now, items have a comment relating to the character on the character's page.
    if (window.layout === 'character' && window.listType === 'item') {
        listItem.appendChild(getComment(object));
    }

    return listItem;
}
/**
 * Get the anchor tag for a single location element.
 * @param {object} object campaign, character, location, or item
 * @returns {HTMLAnchorElement}
 */
const getAnchorElement = function(object) {

    const anchor = document.createElement('a');
    anchor.href = getAnchorHref(object);
    
    // Right now, characters have a little more styling than other objects.
    if (window.listType === 'character') {
        anchor.appendChild(getCharacterSummaryWrapper(object));
    }
    else {
        anchor.textContent = object.name;
    }

    return anchor;
}

/**
 * Get the href property for the anchor tag of a single object element.
 * @param {object} object campaign, character, location, or item
 * @returns {string}
 */
const getAnchorHref = function(object) {

    const folder = `${window.listType}s`;
    const pageLink = object.customLink ?? object.name.replace(/\s+/g, '-').toLowerCase();

    return `../${folder}/${pageLink}`;
}