/**
 * Get a single character link element for the list.
 * @param {object} character 
 * @returns 
 */
export const getCharacterLinkElement = function(character) {
    const listItem = document.createElement('li');

    listItem.appendChild(getCharacterAnchor(character));

    return listItem;
}

/**
 * Get the anchor element for a link to a character.
 * @param {object} character 
 * @returns 
 */
const getCharacterAnchor = function(character) {

    // To make it clickable.
    const link = document.createElement('a');
    link.href = `../characters/${character.name.replace(/\s+/g, '-').toLowerCase()}`;

    link.appendChild(getCharacterSummaryWrapper(character));

    return link;
}

/**
 * Get the summary div element for a link to a character.
 * @param {object} character 
 * @returns 
 */
const getCharacterSummaryWrapper = function(character) {

    // To bundle elements
    const summaryWrapper = document.createElement('div');
    summaryWrapper.className = 'character-summary-wrapper';

    summaryWrapper.appendChild(getCharacterHeader(character));
    summaryWrapper.appendChild(getCharacterIconWrapper(character));

    return summaryWrapper;
}

/**
 * Get the header element for a link to a character.
 * @param {object} character 
 * @returns 
 */
const getCharacterHeader = function(character) {

    // Name of the character.
    const header = document.createElement('h2');
    header.textContent = character.name;

    return header;
}

/**
 * Get the icon wrapper element for a link to a character.
 * @param {object} character 
 * @returns 
 */
const getCharacterIconWrapper = function(character) {

    // To bundle all the icons.
    const icons = document.createElement('div');
    icons.className = 'character-icons';

    // All the associated icons.
    character.icons.forEach(function(icon) {
        icons.appendChild(getCharacterIconSpan(icon));
    });

    return icons;
}

/**
 * Get the icon span element for a link to a character.
 * @param {object} character 
 * @returns 
 */
const getCharacterIconSpan = function(icon) {

    const iconSpan = document.createElement('span');

    iconSpan.classList.add('icon');
    iconSpan.classList.add(icon.name);
    iconSpan.title = window.icons.filter(i => i.name === icon.name)[0].description;

    return iconSpan;
}