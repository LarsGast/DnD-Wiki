import { getCharacterSummaryWrapper } from './character-list-element.js';

/**
 * Get a single character link element for the list.
 * @param {object} character 
 * @returns 
 */
export const getListItem = function(object) {
    const listItem = document.createElement('li');

    if (!object.visible){
        listItem.classList.add('invisible');
    }
    listItem.appendChild(getAnchorElement(object));

    return listItem;
}
/**
 * Get the anchor tag for a single location element.
 * @param {object} location 
 * @returns {HTMLElement}
 */
const getAnchorElement = function(object) {

    const pageLink = object.customLink ?? object.name.replace(/\s+/g, '-').toLowerCase();

    const anchor = document.createElement('a');
    anchor.href = `../${window.listType}/${pageLink}`;
    
    if (window.listType === 'characters') {
        anchor.appendChild(getCharacterSummaryWrapper(object));
    }
    else {
        anchor.textContent = object.name;
    }

    return anchor;
}