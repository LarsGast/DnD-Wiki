import { getObjectList } from './generic-list.js';
import { getObjects } from './generic-object-getter.js';

/**
 * Get all elements for the objects list wrapper.
 * This includes an h2 heading and a body.
 * @returns {HTMLElement[]}
 */
export const getObjectListElements = function() {

    const heading = getHeading();

    const body = getBody();

    if (heading) {
        body.unshift(heading);
    }
    
    return body;
}

/**
 * Get the h2 heading for the object list wrapper.
 * @returns {HTMLHeadingElement}
 */
const getHeading = function() {

    // No heading for main object pages.
    if (window.layout == 'page') {
        return null;
    }

    return getHeadingElement();
}

/**
 * Get the h2 heading for the object list wrapper.
 * @returns {HTMLHeadingElement}
 */
const getHeadingElement = function() {
    const h2Element = document.createElement('h2');
    h2Element.textContent = getHeadingTextContent();

    return h2Element;
}

/**
 * Get the text content for the h2 heading for the object list wrapper.
 * @returns {string}
 */
const getHeadingTextContent = function() {

    let objectType = '';

    switch (window.listType) {
        case 'character':
            objectType = 'karakters';
            break;
        case 'location':
            objectType = 'locaties';
            break;
        default:
            objectType = `${window.listType}s`
            break;;
    }

    return `Gerelateerde ${objectType}`;
}

/**
 * Get the body of the objects list wrapper.
 * @returns {HTMLElement[]}
 */
const getBody = function() {

    // Location-location list has a special body to accommodate for super-, sub-, and nearby locations.
    if (window.layout === 'location' && window.listType === 'location') {
        return getLocationLocationBody()
    }
    // Character-item list has a special body to accommodate for past and current items.
    else if (window.layout === 'character' && window.listType === 'item') {
        return getCharacterItemBody();
    }
    // Image list has a special body to create actual image elements.
    else if (window.listType === 'image') {
        return [getImageBody()];
    }
    else {
        // Make a list so we can loop through it later.
        return [getGenericBody()];
    }
}

/**
 * Get a generic body of the objects list wrapper.
 * @returns {HTMLDivElement}
 */
const getGenericBody = function() {

    const objects = getObjects();

    return getObjectList(objects);
}

/**
 * Get a location-location body for the objects list wrapper.
 * @returns {HTMLElement[]}
 */
const getLocationLocationBody = function() {
    const elements = [];

    elements.push(getHeading3Element('Super-locaties'));
    const superLocations = getObjects('super');
    elements.push(getObjectList(superLocations));

    elements.push(getHeading3Element('Sub-locaties'));
    const subLocations = getObjects('sub');
    elements.push(getObjectList(subLocations));
    
    elements.push(getHeading3Element('Locaties in de buurt'));
    const nearbyLocations = getObjects('nearby');
    elements.push(getObjectList(nearbyLocations));

    return elements;
}

/**
 * Get a character-item body for the objects list wrapper.
 * @returns {HTMLElement[]}
 */
const getCharacterItemBody = function() {
    const elements = [];

    elements.push(getHeading3Element('Huidige bezittingen'));
    const currentItems = getObjects(true);
    elements.push(getObjectList(currentItems));
    
    elements.push(getHeading3Element('Vorige bezittingen'));
    const pastItems = getObjects(false);
    elements.push(getObjectList(pastItems));

    return elements;
}

/**
 * Get a character-item body for the objects list wrapper.
 * @returns {HTMLElement[]}
 */
const getImageBody = function() {

    const objects = getObjects(false);

    return getObjectList(objects);
}

/**
 * Gets an h3 element with given text content.
 * @param {string} textContent 
 * @returns {HTMLHeadingElement}
 */
const getHeading3Element = function(textContent) {
    const header = document.createElement('h3');
    header.textContent = textContent;
    return header
}