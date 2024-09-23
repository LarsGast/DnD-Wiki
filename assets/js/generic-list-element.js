import { getCharacterSummaryWrapper } from './character-list-element.js';

/**
 * Get a single character link element for the list.
 * @param {object} character 
 * @returns 
 */
export const getListItem = function(object, objectType) {
    const listItem = document.createElement('li');

    if (!object.visible){
        listItem.classList.add('invisible');
    }
    listItem.appendChild(getAnchorElement(object, objectType));

    return listItem;
}
/**
 * Get the anchor tag for a single location element.
 * @param {object} location 
 * @returns {HTMLElement}
 */
const getAnchorElement = function(object, objectType) {

    const pageLink = object.customLink ?? object.name.replace(/\s+/g, '-').toLowerCase();

    const anchor = document.createElement('a');
    anchor.href = `../${window.layout}s/${pageLink}`;
    
    if (objectType === 'character') {
        anchor.appendChild(getCharacterSummaryWrapper(object));
    }
    else {
        anchor.textContent = object.name;
    }

    return anchor;
}