/**
 * Get a single location link element for the list.
 * @param {object} location 
 * @returns {HTMLElement}
 */
export const getLocationLinkElement = function(location) {
    const listItem = document.createElement('li');

    if (!location.visible){
        listItem.classList.add('invisible');
    }
    listItem.appendChild(getLocationAnchor(location));

    return listItem;
}

/**
 * Get the anchor tag for a single location element.
 * @param {object} location 
 * @returns {HTMLElement}
 */
const getLocationAnchor = function(location) {

    const locationLink = location.customLink ?? location.name.replace(/\s+/g, '-').toLowerCase();

    const anchor = document.createElement('a');
    anchor.href = `../locations/${locationLink}`;
    anchor.textContent = location.name;

    return anchor;
}