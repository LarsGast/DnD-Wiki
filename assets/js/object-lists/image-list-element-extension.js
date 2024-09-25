export const getImageElement = function(image) {
    const imgElement = document.createElement('img');

    imgElement.src = `../images/${image.name}.${image.fileType}`;
    imgElement.alt = image.alt;
    imgElement.width = image.width;
    imgElement.height = image.height;

    return imgElement;
}