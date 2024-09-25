/**
 * Get all the related objects as specified in the .yml files based on the page layout, current object, and type of list.
 * @returns {object[]}
 */
export const getObjects = function() {

    // Get the names of the related objects.
    const objectNames = getObjectNames();   

    // Get the actual related objects.
    const relatedObjects = window.allObjects.filter(object => 
        objectNames.includes(object.name)
    );

    return relatedObjects;
}

/**
 * Get the names of all the related objects based on the page layout, current object, and type of list.
 * Split between lists that are the same type as the page and lists that are a different type as the page.
 * @returns {string[]}
 */
const getObjectNames = function() {

    if (window.layout === window.listType) {
        return getObjectNamesForSameAsLayout();
    }

    return getObjectNamesForDifferentAsLayout();
}

/**
 * Get the names of all the related objects that use a list type that is not the same as the page layout.
 * So no character list on a character's page or location list on a location's page.
 * @returns {string[]}
 */
const getObjectNamesForDifferentAsLayout = function() {

    const links = window.links;

    // Get all location links to this object.
    const relatedLinks = links.filter(link => link[`${window.layout}Name`] === window.currentObjectName);

    // Get only the names, so we can use these to get full location objects.
    return relatedLinks.map(link => link[`${window.listType}Name`]);
}

/**
 * Get the names of all the related objects that use a list type that is the same as the page layout.
 * So a character list on a character's page or a location list on a location's page.
 * @returns {string[]}
 */
const getObjectNamesForSameAsLayout = function() {

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