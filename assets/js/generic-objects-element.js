import { getObjectList } from './generic-list.js';
import { getObjects } from './generic-object-getter.js';

export const getElements = function() {

    const heading = getHeading();

    const body = getBody();

    if (heading) {
        body.unshift(heading);
    }
    
    return body;
}

const getHeading = function() {
    if (window.layout == 'page') {
        return null;
    }

    return geth2Element();
}

const geth2Element = function() {
    const h2Element = document.createElement('h2');
    h2Element.textContent = geth2TextContent();

    return h2Element;
}

const geth2TextContent = function() {

    let objectType = '';

    switch (window.listType) {
        case 'character':
            objectType = 'karakters';
            break;
        case 'location':
            objectType = 'locaties';
            break;
        default:
            objectType = `${window.listType}s`
            break;;
    }

    return `Gerelateerde ${objectType}`;
}

const getBody = function() {
    const objects = getObjects();

    return [getObjectList(objects)];
}