import { getListItem } from './generic-list-element.js';

/**
 * Fill the list that's displayed on the page with all the related objects.
 * @param {object[]} objects 
 * @returns {HTMLUListElement}
 */
export const getObjectList = function(objects) {

    // Sort the objects accordingly.
    objects = sortObjects(objects);

    return getUlElement(objects);
}

/**
 * Sort the objects accordingly.
 * @param {object[]} objects Unsorted
 * @returns {object[]} Sorted
 */
const sortObjects = function(objects) {
    return objects.sort((a, b) => a.name.localeCompare(b.name));;
}

const getUlElement = function(objects) {
    
    const uList = document.createElement('ul');
    objects.forEach(function(object) {
        const listItem = getListItem(object);
        uList.appendChild(listItem);
    });

    addClassesToList(uList);

    return uList;
}

const addClassesToList = function(uList) {
    if (window.listType === 'characters') {
        uList.classList.add('character-list');
        uList.classList.add('no-style-list');
        uList.classList.add('no-style-link-group');
    }
}