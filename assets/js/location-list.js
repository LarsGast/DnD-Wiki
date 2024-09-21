import { getLocationLinkElement } from './location-list-element.js';
import { getRelatedLocations } from './related-locations.js';

document.addEventListener("DOMContentLoaded", function() {

    // Get all the related locations to this object.
    // This includes all information about the character as the locations.yml file specifies.
    // Unsorted.
    const relatedLocations = getRelatedLocations();

    create()
    //fillList(relatedLocations);
});

const create = function() {
    const header = document.createElement('h2');
    header.textContent = 'Gerelateerde Locaties';

    const locationElements = getLocationHeaderAndList();

    const locationsDiv = document.getElementById('locations');

    locationsDiv.appendChild(header);
    locationElements.forEach(function(element) {
        locationsDiv.appendChild(element);
    })
}

const getLocationHeaderAndList = function() {
    
    const currentObjectType = window.currentObjectType;

    if (currentObjectType === 'location'){
        return getSuperSubAndNearbyLocationHeaderAndList();
    }
    else {
        return getOtherList();
    }
}

const getSuperSubAndNearbyLocationHeaderAndList = function() {

    const elements = [];

    const headerSuper = document.createElement('h3');
    headerSuper.textContent = 'Super-locaties';
    elements.push(headerSuper);

    const superLocations = getSuperLocations();
    const listSuper = document.createElement('ul');
    superLocations.forEach(function(location) {
        const li = getLocationLinkElement(location);
        listSuper.appendChild(li);
    });
    elements.push(listSuper);

    const headerSub = document.createElement('h3');
    headerSub.textContent = 'Sub-locaties';
    elements.push(headerSub);

    const subLocations = getSubLocations();
    const listSub = document.createElement('ul');
    subLocations.forEach(function(location) {
        const li = getLocationLinkElement(location);
        listSub.appendChild(li);
    });
    elements.push(listSub);

    const headerNearby = document.createElement('h3');
    headerNearby.textContent = 'Locaties in de buurt';
    elements.push(headerNearby);

    const nearbyLocations = getNearbyLocations();
    const listNearby = document.createElement('ul');
    nearbyLocations.forEach(function(location) {
        const li = getLocationLinkElement(location);
        listNearby.appendChild(li);
    });
    elements.push(listNearby);

    return elements;
}

/**
 * Fill the list that's displayed on the page with all the related locations.
 * @param {object[]} locations 
 */
const fillList = function(locations) {
    
    const locationType = window.locationType;

    // Sort by name.
    locations = locations.sort((a, b) => a.name.localeCompare(b.name));

    // Fill the page with all info required for a link to all related locations.
    const uList = document.getElementById(`location-list`);
    locations.forEach(function(location) {
        const listItem = getLocationLinkElement(location);
        uList.appendChild(listItem);
    });
}