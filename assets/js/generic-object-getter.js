/**
 * Get all the related objects as specified in the .yml files based on the page layout, current object, and type of list.
 * @param {string | boolean} metadata Metadata that can take many different forms. This gets passed through to the functions which cast it to the right type.
 * @returns {object[]}
 */
export const getObjects = function(metadata) {

    // Get the names of the related objects.
    const objectNames = getObjectNames(metadata);   

    // Get the actual related objects.
    const relatedObjects = window.allObjects.filter(object => 
        objectNames.includes(object.name)
    );

    return relatedObjects;
}

/**
 * Get the names of all the related objects based on the page layout, current object, and type of list.
 * Split between lists that are the same type as the page and lists that are a different type as the page.
 * @param {string | boolean} metadata Metadata that can take many different forms. This gets passed through to the functions which cast it to the right type.
 * @returns {string[]}
 */
const getObjectNames = function(metadata) {

    if (window.layout === 'page') {
        return getObjectNamesForMainPages();
    }

    if (window.layout === window.listType) {
        return getObjectNamesForSameAsLayout(metadata);
    }

    return getObjectNamesForDifferentAsLayout(metadata);
}

/**
 * Get the names of all the related objects that should appear on the 'page' layout. 
 * @returns {string[]}
 */
const getObjectNamesForMainPages = function() {
    return window.allObjects.map(object => object.name);
}

/**
 * Get the names of all the related objects that use a list type that is not the same as the page layout.
 * So no character list on a character's page or location list on a location's page.
 * @param {string | boolean} metadata Metadata that can take many different forms. This gets passed through to the functions which cast it to the right type.
 * @returns {string[]}
 */
const getObjectNamesForDifferentAsLayout = function(metadata) {

    if (window.layout === 'character' && window.listType === 'item') {
        return getCharacterItemNames(metadata);
    }

    const links = window.links;

    // Get all location links to this object.
    const relatedLinks = links.filter(link => link[`${window.layout}Name`] === window.currentObjectName);

    // Get only the names, so we can use these to get full location objects.
    return relatedLinks.map(link => link[`${window.listType}Name`]);
}

/**
 * Get the names of all the related objects that use a list type that is the same as the page layout.
 * So a character list on a character's page or a location list on a location's page.
 * @param {string | boolean} metadata Metadata that can take many different forms. This gets passed through to the functions which cast it to the right type.
 * @returns {string[]}
 */
const getObjectNamesForSameAsLayout = function(metadata) {

    if (window.layout === 'location') {
        return getLocationLocationNames(metadata);
    }

    const links = window.links;

    // The name of the property used to get the link is lowerCamelCase. 
    const layoutCapitalized = window.layout.charAt(0).toUpperCase() + window.layout.slice(1);

    // Get all object links to this object.
    const relatedLinks = links.filter(link => 
        link[`first${layoutCapitalized}Name`] === window.currentObjectName || 
        link[`second${layoutCapitalized}Name`] === window.currentObjectName
    );

    // Get only the names, so we can use these to get full objects.
    let relatedObjectNames = relatedLinks.map(link => link[`first${layoutCapitalized}Name`])
        .concat(relatedLinks.map(link => link[`second${layoutCapitalized}Name`]))
        .filter(name => name !== window.currentObjectName);
    
    // Remove dupes.
    relatedObjectNames = [...new Set(relatedObjectNames)];

    return relatedObjectNames;
}

/**
 * Get the names of the locations related to the given location.
 * Differentiate between super-, sub-, and nearby locations.
 * @param {string} superSubOrNearby Wether we should get all the super-, sub-, or nearby locations
 * @returns {string[]}
 */
const getLocationLocationNames = function(superSubOrNearby) {
    const currentLocationName = window.currentObjectName;
    const links = window.links;

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
 * Get the names of the items related to the given character.
 * Differentiate between items currently owned by the character, and items owned by the character in the past.
 * @param {boolean} current Wether we should get all the items currently owned by the character, or all the items owned by the character in the past
 * @returns {string[]}
 */
const getCharacterItemNames = function(current) {

    const links = window.links;

    // Get all location links to this object.
    const relatedLinks = links.filter(link => link[`${window.layout}Name`] === window.currentObjectName && link.current === current);

    // Get only the names, so we can use these to get full location objects.
    return relatedLinks.map(link => link[`${window.listType}Name`]);
}