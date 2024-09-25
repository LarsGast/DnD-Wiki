export const getLocations = function(superSubOrNearby) {

    switch(window.layout) {
        case 'page':
            return getAllLocations();
        case 'location':
            return getLocationLocations(superSubOrNearby);
        default:
            return getLinkedLocations();
    }
}

const getAllLocations = function() {
    return window.locationsData;
}

const getLocationLocations = function(superSubOrNearby) {
    const locationName = window.currentObjectName;
    const links = window.locationLocationLinks;

    let locationNames = [];

    if (superSubOrNearby === 'super') {
        locationNames = links
            .filter(link => link.isSuperSubRelationship === true && link.secondLocationName === locationName)
            .map(link => link.firstLocationName);
    }
    else if (superSubOrNearby === 'sub') {
        locationNames = links
            .filter(link => link.isSuperSubRelationship === true && link.firstLocationName === locationName)
            .map(link => link.secondLocationName);
    }
    else {
        const relatedLocationsLinks = links.filter(link => link.isSuperSubRelationship === false && (
            link.firstLocationName === locationName || 
            link.secondLocationName === locationName));
        locationNames = relatedLocationsLinks.map(link => link.firstLocationName).concat(relatedLocationsLinks.map(link => link.secondLocationName))
            .filter(name => name !== locationName);
    
        // Remove dupes.
        locationNames = [...new Set(locationNames)];
    }

    // Get the actual character objects.
    // Remove invisible characters, unless we want to see them (showInvisible: true in _config.yml).
    const locationsData = window.locationsData;
    const relatedLocations = locationsData.filter(location => 
        locationNames.includes(location.name)
    );

    return relatedLocations;
}

const getLinkedLocations = function() {
    const links = window[`${window.layout}LocationLinks`];

    // Get all location links to this character.
    const relatedLinks = links.filter(link => link[`${window.layout}Name`] === window.currentObjectName);

    // Get only the names, so we can use these to get full location objects.
    const relatedLocationNames = relatedLinks.map(link => link.locationName);
    
    // Get the actual character objects.
    // Remove invisible characters, unless we want to see them (showInvisible: true in _config.yml).
    const locationsData = window.locationsData;
    const relatedLocations = locationsData.filter(location => 
        relatedLocationNames.includes(location.name)
    );

    return relatedLocations;
}