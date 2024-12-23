/**
 * Fills the generic info div on a player character page.
 */
export const fillGenericInfoDiv = function() {
    const containerDiv = document.getElementById('generic-info-container');
    
    const elements = getGenericInfoSectionElements();

    elements.forEach(function(element) {
        containerDiv.appendChild(element);
    });
}

/**
 * Gets all elements that should be put in the generic info section on a PC page.
 * @returns {HTMLElement[]}
 */
const getGenericInfoSectionElements = function() {
    return [
        getHeadingElement(),
        getGenericInfoList()
    ];
}

/**
 * Gets the heading (h2) element for the generic info section.
 * @returns {HTMLHeadingElement}
 */
const getHeadingElement = function() {
    const h2 = document.createElement('h2');
    h2.textContent = "Algemeen";

    return h2;
}

/**
 * Gets the list (ul) containing all generic info of the PC.
 * @returns {HTMLUListElement}
 */
const getGenericInfoList = function() {
    const playerCharacterObject = window.currentObject;

    const ul = document.createElement('ul');

    ul.appendChild(getGenericInfoListItem('Class & Level', getClassAndLevelString(playerCharacterObject.levels)));
    ul.appendChild(getGenericInfoListItem('Race', playerCharacterObject.race));
    ul.appendChild(getGenericInfoListItem('Background', playerCharacterObject.background));
    ul.appendChild(getGenericInfoListItem('Alignment', playerCharacterObject.alignment));

    return ul;
}

/**
 * Gets the list item (li) element for a single ability score of a PC.
 * @param {string} propertyName
 * @param {number} propertyValue
 * @returns {HTMLLIElement}
 */
const getGenericInfoListItem = function(propertyName, propertyValue) {

    const li = document.createElement('li');

    li.textContent = `${propertyName}: ${propertyValue}`;

    return li;
}

/**
 * Get the display string for the class & level property
 * @param {{className: string, level: number}[]} classes 
 */
const getClassAndLevelString = function(classes) {
    return classes
        .map(classObject => `${classObject.className} ${classObject.level}`)
        .join(', ');
}