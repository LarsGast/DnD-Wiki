import { getCharacterSummaryWrapper } from './character-list-element.js';

/**
 * Get a single object link element for the list.
 * @param {object} object campaign, character, location, or item
 * @returns {HTMLLIElement}
 */
export const getListItem = function(object) {
    const listItem = document.createElement('li');

    if (!object.published){
        listItem.classList.add('unpublished');
    }
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
    anchor.href = `../${window.listType}/${pageLink}`;
    
    // Right now, characters have a little more styling than other objects.
    if (window.listType === 'characters') {
        anchor.appendChild(getCharacterSummaryWrapper(object));
    }
    else {
        anchor.textContent = object.name;
    }

    return anchor;
}