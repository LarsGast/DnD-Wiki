import { getElements } from './generic-objects-element.js';

export const myFunction = function(objects, links, listType, containerId) {
    window.allObjects = objects;
    window.links = links;
    window.listType = listType;

    const container = document.getElementById(containerId);

    const elements = getElements();

    elements.forEach(function(element) {
        container.appendChild(element);
    })
}