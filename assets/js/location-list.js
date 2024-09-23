import { getAllLocations } from './locations-getter.js';
import { getLocationLinkElement } from './location-list-element.js';

/**
 * Get all the elements (headers, lists) needed to create the locations section.
 * @returns {HTMLElement[]} A list of HTML elements containing all information to create a list of locations.
 */
export const getLocationElements = function() {
    
    const currentObjectType = window.currentObjectType;

    if (currentObjectType === null) {
        return getAllLocationsList();
    }
    else if (currentObjectType === 'location'){
        return getSuperSubAndNearbyLocationHeaderAndList();
    }
    else {
        return getOtherList();
    }
}

/**
 * Gets the unordered list of all locations.
 * @returns {HTMLElement[]} A list containing the ul element, so we can loop through it later.
 */
const getAllLocationsList = function() {
    const allLocations = getAllLocations();
    return [getLocationList(allLocations)];
}

const getSuperSubAndNearbyLocationHeaderAndList = function() {

    const elements = [];

    const header = document.createElement('h2');
    header.textContent = 'Gerelateerde Locaties';
    elements.push(header);

    const headerSuper = document.createElement('h3');
    headerSuper.textContent = 'Super-locaties';
    elements.push(headerSuper);

    const superLocations = getSuperLocations();
    elements.push(getLocationList(superLocations));

    const headerSub = document.createElement('h3');
    headerSub.textContent = 'Sub-locaties';
    elements.push(headerSub);

    const subLocations = getSubLocations();
    elements.push(getLocationList(subLocations));

    const headerNearby = document.createElement('h3');
    headerNearby.textContent = 'Locaties in de buurt';
    elements.push(headerNearby);

    const nearbyLocations = getNearbyLocations();
    elements.push(getLocationList(nearbyLocations));

    return elements;
}

const getLocationList = function(locations) {

    // Sort by name.
    locations = locations.sort((a, b) => a.name.localeCompare(b.name));

    // Create and fill list.
    const listElement = document.createElement('ul');
    locations.forEach(function(location) {
        const li = getLocationLinkElement(location);
        listElement.appendChild(li);
    });

    return listElement;
}