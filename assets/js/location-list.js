import { getLocationLinkElement } from './location-list-element.js';
import { getRelatedLocations } from './related-locations.js';

document.addEventListener("DOMContentLoaded", function() {

    // Get all the related locations to this object.
    // This includes all information about the character as the locations.yml file specifies.
    // Unsorted.
    const relatedLocations = getRelatedLocations();

    fillList(relatedLocations);
});

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