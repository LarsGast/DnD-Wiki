const PLAYER_CHARACTER_KEY = "playerCharacter";
let cachedPlayerCharacter = null;

/**
 * Get the value of the property with the given name on the player character object in local storage.
 * @param {string} propertyName
 * @returns {any} Property value.
 */
export const getPlayerCharacterProperty = function(propertyName) {
    const playerCharacter = getPlayerCharacter();
    return playerCharacter[propertyName];
};

/**
 * Set a property on the player character object in local storage.
 * @param {string} propertyName
 * @param {string} propertyValue
 */
export const setPlayerCharacterProperty = function(propertyName, propertyValue) {
    if (typeof propertyName !== "string" || typeof propertyValue !== "string") {
        throw new Error("Both propertyName and propertyValue must be strings.");
    }

    const playerCharacter = getPlayerCharacter() || {};

    playerCharacter[propertyName] = propertyValue;

    savePlayerCharacter(playerCharacter);
};

/**
 * Get the player character object from local storage.
 * @returns {Object} Full character object.
 */
const getPlayerCharacter = function() {
    if (cachedPlayerCharacter !== null) return cachedPlayerCharacter;

    const playerCharacterString = localStorage.getItem(PLAYER_CHARACTER_KEY);
    try {
        cachedPlayerCharacter = playerCharacterString ? JSON.parse(playerCharacterString) : {};
        return cachedPlayerCharacter;
    } catch (error) {
        console.error("Error parsing player character JSON:", error);
        cachedPlayerCharacter = {};
        return cachedPlayerCharacter;
    }
};

/**
 * Save the player character object to local storage.
 * @param {Object} playerCharacter
 */
const savePlayerCharacter = function(playerCharacter) {
    cachedPlayerCharacter = playerCharacter;
    const playerCharacterString = JSON.stringify(playerCharacter);
    localStorage.setItem(PLAYER_CHARACTER_KEY, playerCharacterString);
};
