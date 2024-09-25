import { getObjectListElements } from './generic-object-list-wrapper-elements.js';

export const myFunction = function(objects, links, listType, containerId) {
    window.allObjects = objects;
    window.links = links;
    window.listType = listType;

    const container = document.getElementById(containerId);

    const elements = getObjectListElements();

    elements.forEach(function(element) {
        container.appendChild(element);
    })
}