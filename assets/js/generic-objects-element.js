import { getObjectList } from './generic-list.js';
import { getObjects } from './generic-object-getter.js';

export const getElements = function() {

    const heading = getHeading();

    const body = getBody();

    if (heading) {
        body.unshift(heading);
    }
    
    return body;
}

const getHeading = function() {
    if (window.layout == 'page') {
        return null;
    }

    return geth2Element();
}

const geth2Element = function() {
    const h2Element = document.createElement('h2');
    h2Element.textContent = geth2TextContent();

    return h2Element;
}

const geth2TextContent = function() {

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

const getBody = function() {

    if (window.layout === 'location' && window.listType === 'location') {
        return getLocationLocationBody()
    }

    const objects = getObjects();

    return [getObjectList(objects)];
}

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
 * Gets an h3 element with given text content.
 * @param {string} textContent 
 * @returns {HTMLHeadingElement}
 */
const getHeading3Element = function(textContent) {
    const header = document.createElement('h3');
    header.textContent = textContent;
    return header
}