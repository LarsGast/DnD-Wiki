import { getObjects } from "./object-lists/generic-object-getter.js";

export const addMainImageToPage = function(images, links) {

    window.allObjects = images;
    window.links = links;
    window.listType = 'image';

    const postElement = document.getElementsByClassName('post-content')[0];

    const imgElement = getImgElement();

    postElement.insertAdjacentElement('afterbegin', imgElement);
}

const getImgElement = function() {

    const headerImage = getObjects(true)[0];
    
    const imgElement = document.createElement('img');

    imgElement.src = `../images/${headerImage.name}.${headerImage.fileType}`;
    imgElement.alt = headerImage.alt;
    imgElement.width = headerImage.width;
    imgElement.height = headerImage.height;

    return imgElement;
}