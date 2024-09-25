import { getObjectListElements } from './generic-object-list-wrapper-elements.js';

/**
 * Fills the given div (by ID) with the required elements based on various input parameters.
 * @param {object[]} objects All objects of the listType, as specified in the various .yml files
 * @param {object[]} links All links between the listType and the page layout
 * @param {string} listType The type of list that is being created
 * @param {string} containerId The ID of the container div in which the elements should be placed
 */
export const fillObjectListDiv = function(objects, links, listType, containerId) {
    window.allObjects = objects;
    window.links = links;
    window.listType = listType;

    const container = document.getElementById(containerId);

    const elements = getObjectListElements();

    elements.forEach(function(element) {
        container.appendChild(element);
    })
}