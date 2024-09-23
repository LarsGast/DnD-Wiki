import { getLocations } from './locations-getter.js';
import { getLocationLinkElement } from './location-list-element.js';

/**
 * Get all the elements (headers, lists) needed to create the locations section.
 * @returns {HTMLElement[]} A list of HTML elements containing all information to create a list of locations.
 */
export const getLocationElements = function() {

    const header = getHeader();
    const body = getBody();

    if (header) {
        body.unshift(header);
    }
    
    return body;
}

const getHeader = function() {
    switch (window.layout) {
        case null:
            return null;
        case 'campaign':
            return getHeaderElement('Locaties');
        default:
            return getHeaderElement('Gerelateerde locaties');
    }
}

const getHeaderElement = function(name) {
    const header = document.createElement('h2');
    header.textContent = name;

    return header;
}

const getBody = function() {
    if (window.layout === 'location'){
        return getLocationPageElements();
    }
    else {
        return getGenericPageElements();
    }
}


const getLocationPageElements = function() {

    const elements = [];

    const headerSuper = document.createElement('h3');
    headerSuper.textContent = 'Super-locaties';
    elements.push(headerSuper);

    const superLocations = getLocations('super');
    elements.push(getLocationList(superLocations));

    const headerSub = document.createElement('h3');
    headerSub.textContent = 'Sub-locaties';
    elements.push(headerSub);

    const subLocations = getLocations('sub');
    elements.push(getLocationList(subLocations));

    const headerNearby = document.createElement('h3');
    headerNearby.textContent = 'Locaties in de buurt';
    elements.push(headerNearby);

    const nearbyLocations = getLocations('nearby');
    elements.push(getLocationList(nearbyLocations));

    return elements;
}

const getGenericPageElements = function() {
    const allLocations = getLocations();
    return [getLocationList(allLocations)];
}

const getLocationList = function(locations) {

    const listElement = document.createElement('ul');

    if (locations.length === 0) {
        const li = document.createElement('li');
        li.textContent = '-';
        listElement.appendChild(li);
        
        return listElement;
    }

    // Sort by name.
    locations = locations.sort((a, b) => a.name.localeCompare(b.name));

    // Create and fill list.
    locations.forEach(function(location) {
        const li = getLocationLinkElement(location);
        listElement.appendChild(li);
    });

    return listElement;
}