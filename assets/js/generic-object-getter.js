

export const getObjects = function() {

    const objectNames = getObjectNames();   

    // Get the actual related objects.
    const relatedObjects = window.allObjects.filter(object => 
        objectNames.includes(object.name)
    );

    return relatedObjects;
}

const getObjectNames = function() {
    const links = window.links;

    // Get all location links to this object.
    const relatedLinks = links.filter(link => link[`${window.layout}Name`] === window.currentObjectName);

    // Get only the names, so we can use these to get full location objects.
    return relatedLinks.map(link => link[`${window.listType}Name`]);
}