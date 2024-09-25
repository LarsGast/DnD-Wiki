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

/**
 * Get a ul element containing all objects or a single dash (-).
 * @param {object[]} objects 
 * @returns {HTMLUListElement}
 */
const getUlElement = function(objects) {

    // Create an empty list with a singe dash (-) if there are no objects given.
    if (objects.length === 0) {
        return getEmptyList();
    }

    return getFilledList(objects);
}

/**
 * Get a ul element with a single dash (-).
 * @returns {HTMLUListElement}
 */
const getEmptyList = function() {
    const uList = document.createElement('ul');

    const li = document.createElement('li');
    li.textContent = '-';
    uList.appendChild(li);
    
    return uList;
}

/**
 * Get a new ul element containing all information about links to the given objects.
 * @param {*} objects 
 * @returns {HTMLUListElement}
 */
const getFilledList = function(objects) {

    const uList = document.createElement('ul');

    objects.forEach(function(object) {
        const listItem = getListItem(object);
        uList.appendChild(listItem);
    });

    addClassesToList(uList);

    return uList;
}

/**
 * Add classes to the ul element.
 * Currently only for the character list.
 * @param {HTMLUListElement} uList 
 */
const addClassesToList = function(uList) {
    if (window.listType === 'character') {
        uList.classList.add('character-list');
        uList.classList.add('no-style-list');
        uList.classList.add('no-style-link-group');
    }
}