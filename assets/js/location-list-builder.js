import { getLocationElements } from './location-list.js';

document.addEventListener("DOMContentLoaded", function() {
    
    window.listType = 'locations';

    // Get all the elements
    const locationElements = getLocationElements();

    // Add all the elements to the wrapper div.
    const locationsDiv = document.getElementById('locations');
    locationElements.forEach(function(element) {
        locationsDiv.appendChild(element);
    })
});