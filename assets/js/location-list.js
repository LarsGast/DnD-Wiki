import { getLocations } from './locations-getter.js';
import { getListItem } from "./generic-list-element.js";

/**
 * Get all the elements (headers, lists) needed to create the locations section.
 * @returns {HTMLElement[]} A list of HTML elements containing all information to create a list of locations.
 */
export const getLocationElements = function() {

    const header = getHeader();
    const body = getBody();

    if (header) {
        body.unshift(header);
    }
    
    return body;
}

/**
 * Gets a header element with text based on the layout of the page.
 * @returns {HTMLHeadingElement | null} null for the main locations page, heading element for all other pages.
 */
const getHeader = function() {
    switch (window.layout) {
        case 'page':
            return null;
        case 'campaign':
            return getHeading2Element('Locaties');
        default:
            return getHeading2Element('Gerelateerde locaties');
    }
}

/**
 * Gets a heading element with text based on input
 * @param {string} textContent 
 * @returns {HTMLHeadingElement}
 */
const getHeading2Element = function(textContent) {
    const header = document.createElement('h2');
    header.textContent = textContent;

    return header;
}

/**
 * Gets the body of the locations list elements.
 * The location layout should result in three lists with headings, while all other layouts should result in a single list.
 * @returns {HTMLElement[]}
 */
const getBody = function() {
    if (window.layout === 'location'){
        return getLocationPageElements();
    }
    else {
        return getGenericPageElements();
    }
}

/**
 * Gets all the elements needed for the body of the location page layout
 * @returns {HTMLElement[]}
 */
const getLocationPageElements = function() {

    const elements = [];

    elements.push(getHeading3Element('Super-locaties'));

    const superLocations = getLocations('super');
    elements.push(getLocationList(superLocations));

    elements.push(getHeading3Element('Sub-locaties'));

    const subLocations = getLocations('sub');
    elements.push(getLocationList(subLocations));
    
    elements.push(getHeading3Element('Locaties in de buurt'));

    const nearbyLocations = getLocations('nearby');
    elements.push(getLocationList(nearbyLocations));

    return elements;
}

/**
 * Gets an h3 element with given text content.
 * @param {string} textContent 
 * @returns {HTMLHeadingElement}
 */
const getHeading3Element = function(textContent) {
    const header = document.createElement('h3');
    header.textContent = textContent;
    return header
}

/**
 * Gets all the elements needed for the body of a non-location page layout 
 * @returns {HTMLUListElement[]} A single UL element as a list.
 */
const getGenericPageElements = function() {
    const allLocations = getLocations();
    return [getLocationList(allLocations)];
}

/**
 * Gets a list containing the given locations.
 * @param {object[]} locations 
 * @returns {HTMLUListElement} A list with a single dash (-) if the locations parameter is empty. Otherwise, a ul element containing links to all given locations.
 */
const getLocationList = function(locations) {

    const listElement = document.createElement('ul');

    if (locations.length === 0) {
        const li = document.createElement('li');
        li.textContent = '-';
        listElement.appendChild(li);
        
        return listElement;
    }

    // Sort by name.
    locations = locations.sort((a, b) => a.name.localeCompare(b.name));

    // Create and fill list.
    locations.forEach(function(location) {
        const li = getListItem(location);
        listElement.appendChild(li);
    });

    return listElement;
}