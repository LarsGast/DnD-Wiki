/**
 * Get the comment that goes with the related item on the character's list.
 * @param {object} item item.yml object
 * @returns {Text} A text node object (possibly empty)
 */
export const getComment = function(item) {

    // Get the character-item link for the given item.
    const relatedLink = window.links.filter(link => link.characterName === window.currentObjectName && link.itemName === item.name)[0];

    if (relatedLink.comment) {
        // Comment should lead with a space and be incased in brackets.
        return document.createTextNode(` (${relatedLink.comment})`);
    }

    return document.createTextNode('');
}