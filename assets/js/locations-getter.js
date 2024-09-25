/**
 * Get all the location objects as specified in locations.yml based on the page layout and current object.
 * @param {string} superSubOrNearby 
 * @returns {object[]} All locations which should be displayed on the page.
 */
export const getLocations = function(superSubOrNearby) {

    const locationNames = getLocationNames(superSubOrNearby);   

    // Get the actual location objects.
    const locationsData = window.locationsData;
    const locations = locationsData.filter(location => 
        locationNames.includes(location.name)
    );

    return locations
}

/**
 * Get all the location names based on the page layout and current object. 
 * @param {string} superSubOrNearby 
 * @returns 
 */
const getLocationNames = function(superSubOrNearby) {
    switch(window.layout) {
        case 'page':
            return getAllLocations();
        case 'location':
            return getLocationLocations(superSubOrNearby);
        default:
            return getLinkedLocations();
    }
}

/**
 * Gets the names of all location objects.
 * Primarily for the locations main page.
 * @returns {string[]}
 */
const getAllLocations = function() {
    return window.locationsData.map(location => location.name);
}

/**
 * Gets the names of all locations related to the current location.
 * These are either:
 * - All super locations
 * - All sub locations
 * - All locations that are nearby
 * @param {string} superSubOrNearby 
 * @returns {string[]}
 */
const getLocationLocations = function(superSubOrNearby) {
    const currentLocationName = window.currentObjectName;
    const links = window.locationLocationLinks;

    if (superSubOrNearby === 'super') {
        return links
            .filter(link => link.isSuperSubRelationship === true && link.secondLocationName === currentLocationName)
            .map(link => link.firstLocationName);
    }
    else if (superSubOrNearby === 'sub') {
        return links
            .filter(link => link.isSuperSubRelationship === true && link.firstLocationName === currentLocationName)
            .map(link => link.secondLocationName);
    }
    else {
        const relatedLocationsLinks = links.filter(link => link.isSuperSubRelationship === false && (
            link.firstLocationName === currentLocationName || 
            link.secondLocationName === currentLocationName));
        
        const locationNames = relatedLocationsLinks.map(link => link.firstLocationName).concat(relatedLocationsLinks.map(link => link.secondLocationName))
            .filter(name => name !== currentLocationName);
    
        // Remove dupes.
        return [...new Set(locationNames)];
    }
}

/**
 * Gets the names of all location related to the current non-location object.
 * @returns {string[]}
 */
const getLinkedLocations = function() {
    const links = window[`${window.layout}LocationLinks`];

    // Get all location links to this object.
    const relatedLinks = links.filter(link => link[`${window.layout}Name`] === window.currentObjectName);

    // Get only the names, so we can use these to get full location objects.
    return relatedLinks.map(link => link.locationName);
}