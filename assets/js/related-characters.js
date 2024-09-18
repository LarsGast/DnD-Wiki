/**
 * Get all related characters to the given character
 * @param {string} objectName Name of the character who we're currently viewing
 * @returns All characters that are related to the given one, as specified in _data/characters.yml
 */
export const getRelatedCharacters = function() {  

    const relatedCharacterNames = getRelatedCharacterNames();
    
    // Get the actual character objects.
    // Remove invisible characters, unless we want to see them (showInvisible: true in _config.yml).
    const charactersData = window.charactersData;
    const relatedCharacters = charactersData.filter(character => 
        relatedCharacterNames.includes(character.name) &&
        (character.visible != false || window.showInvisible)
    );

    return relatedCharacters;
}

const getRelatedCharacterNames = function() {
    const currentObjectType = window.currentObjectType;
    const currentObjectName = window.currentObjectName;

    switch (currentObjectType) {
        case "campaign":
            return getCampaignCharacterLinks(currentObjectName);
        case "character":
            return getCharacterCharacterLinks(currentObjectName);
        case "location":
            return getLocationCharacterLinks(currentObjectName);
        case "item":
            return getItemCharacterLinks(currentObjectName);
    }
}

const getCampaignCharacterLinks = function(campaignName) {

    const links = window.campaignCharacterLinks;

    // Get all links to this location.
    const relatedLinks = links.filter(link => link.campaignName === campaignName);

    // Get only the names, so we can use these to get full character objects.
    // Remove dupes.
    const relatedCharacterNames = relatedLinks.map(link => link.characterName);

    return relatedCharacterNames;
}

const getCharacterCharacterLinks = function(characterName) {

    const characterLinks = window.characterCharacterLinks;

    // Get all links to this character.
    const relatedCharacterLinks = characterLinks.filter(characterLink => 
        characterLink.firstCharacterName === characterName ||
        characterLink.secondCharacterName === characterName);
    
    // Get only the names, so we can use these to get full character objects.
    // Be sure to filter out the name of the character itself.
    let relatedCharacterNames = relatedCharacterLinks.map(characterLink => characterLink.firstCharacterName)
        .concat(relatedCharacterLinks.map(characterLink => characterLink.secondCharacterName))
        .filter(name => name !== characterName);
    
    // Remove dupes.
    relatedCharacterNames = [...new Set(relatedCharacterNames)];

    return relatedCharacterNames;
}

const getLocationCharacterLinks = function(locationName) {

    const links = window.locationCharacterLinks;

    // Get all links to this location.
    const relatedLinks = links.filter(link => link.locationName === locationName);

    // Get only the names, so we can use these to get full character objects.
    // Remove dupes.
    const relatedCharacterNames = relatedLinks.map(link => link.characterName);

    return relatedCharacterNames;
}

const getItemCharacterLinks = function(itemName) {

    const links = window.itemCharacterLinks;

    // Get all links to this location.
    const relatedLinks = links.filter(link => link.itemName === itemName);

    // Get only the names, so we can use these to get full character objects.
    // Remove dupes.
    const relatedCharacterNames = relatedLinks.map(link => link.characterName);

    return relatedCharacterNames;
}