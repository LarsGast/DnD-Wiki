/**
 * Get all related locations to the given object
 * @returns {object[]} All locations that are related to the given object, as specified in _data/locations.yml
 */
export const getRelatedLocations = function() {  

    // Get the names of the related locations.
    const relatedLocationNames = getRelatedLocationNames();
    
    // Get the actual location objects.
    // Remove invisible locations, unless we want to see them (showInvisible: true in _config.yml).
    const locationsData = window.locationsData;
    const relatedLocations = locationsData.filter(location => 
        relatedLocationNames.includes(location.name) &&
        (location.visible != false || window.showInvisible)
    );

    return relatedLocations;
}

/**
 * Get the names of all the related locations to the given object.
 * @returns {string[]}
 */
const getRelatedLocationNames = function() {
    const currentObjectType = window.currentObjectType;
    const currentObjectName = window.currentObjectName;

    switch (currentObjectType) {
        case "campaign":
            return getCampaignLocationLinks(currentObjectName);
        case "character":
            return getCharacterLocationLinks(currentObjectName);
        case "location":
            return getLocationLocationLinks(currentObjectName);
        case "item":
            return getItemLocationLinks(currentObjectName);
        default:
            return getAllLocationNames();
    }
}

/**
 * Get the names of all the locations.
 * @returns {string[]}
 */
const getAllLocationNames = function() {
    const locationsData = window.locationsData;

    const locationNames = locationsData.map(location => location.name);

    return locationNames;
}

/**
 * Get the names of every location related to the given campaign.
 * @param {object} campaignName 
 * @returns {string[]}
 */
const getCampaignLocationLinks = function(campaignName) {

    const links = window.campaignLocationLinks;

    // Get all location links to this campaign.
    const relatedLinks = links.filter(link => link.campaignName === campaignName);

    // Get only the names, so we can use these to get full location objects.
    const relatedLocationNames = relatedLinks.map(link => link.locationName);

    return relatedLocationNames;
}

/**
 * Get the names of every location related to the given location.
 * @param {object} characterName 
 * @returns {string[]}
 */
const getCharacterLocationLinks = function(characterName) {

    const links = window.characterLocationLinks;

    // Get all location links to this campaign.
    const relatedLinks = links.filter(link => link.characterName === characterName);

    // Get only the names, so we can use these to get full location objects.
    const relatedLocationNames = relatedLinks.map(link => link.locationName);

    return relatedLocationNames;
}

/**
 * Get the names of every location related to the given location.
 * @param {object} locationName 
 * @returns {string[]}
 */
const getLocationLocationLinks = function(locationName) {
    // TODO: location-to-location links.
}

/**
 * Get the names of every location related to the given item.
 * @param {object} itemName 
 * @returns {string[]}
 */
const getItemLocationLinks = function(itemName) {

    const links = window.itemLocationLinks;

    // Get all location links to this item.
    const relatedLinks = links.filter(link => link.itemName === itemName);

    // Get only the names, so we can use these to get full location objects.
    const relatedLocationNames = relatedLinks.map(link => link.locationName);

    return relatedLocationNames;
}