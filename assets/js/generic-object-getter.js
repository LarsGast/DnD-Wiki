

export const getObjects = function() {

    const objectNames = getObjectNames();   

    // Get the actual related objects.
    const relatedObjects = window.allObjects.filter(object => 
        objectNames.includes(object.name)
    );

    return relatedObjects;
}

const getObjectNames = function() {

    if (window.layout === window.listType) {
        return getObjectNamesForSameAsLayout();
    }

    return getObjectNamesForDifferentAsLayout();
}

const getObjectNamesForDifferentAsLayout = function() {

    const links = window.links;

    // Get all location links to this object.
    const relatedLinks = links.filter(link => link[`${window.layout}Name`] === window.currentObjectName);

    // Get only the names, so we can use these to get full location objects.
    return relatedLinks.map(link => link[`${window.listType}Name`]);
}

const getObjectNamesForSameAsLayout = function() {

    const links = window.links;
    const layoutCapitalized = window.layout.charAt(0).toUpperCase() + window.layout.slice(1);

    // Get all location links to this object.
    const relatedLinks = links.filter(link => 
        link[`first${layoutCapitalized}Name`] === window.currentObjectName || 
        link[`second${layoutCapitalized}Name`] === window.currentObjectName
    );

    // Get only the names, so we can use these to get full location objects.
    let relatedObjectNames = relatedLinks.map(link => link[`first${layoutCapitalized}Name`])
        .concat(relatedLinks.map(link => link[`second${layoutCapitalized}Name`]))
        .filter(name => name !== window.currentObjectName);
    
    // Remove dupes.
    relatedObjectNames = [...new Set(relatedObjectNames)];

    return relatedObjectNames;
}