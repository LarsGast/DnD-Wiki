const PLAYER_CHARACTER_KEY = "playerCharacter";
let cachedPlayerCharacter = null;

/**
 * Get the value of the property with the given name on the player character object in local storage.
 * @param {string} propertyName
 * @returns {any} Property value.
 */
export const getPlayerCharacterProperty = function(propertyName) {
    const playerCharacter = getPlayerCharacter();
    const property = playerCharacter[propertyName];

    if (property) {
        return property;
    }

    // Return the default value for the property if none is found.
    const defaultCharacter = getDefaultPlayerCharacter();
    return defaultCharacter[propertyName];
};

/**
 * Set a property on the player character object in local storage.
 * @param {string} propertyName
 * @param {Object} propertyValue
 */
export const setPlayerCharacterProperty = function(propertyName, propertyValue) {

    const playerCharacter = getPlayerCharacter();

    playerCharacter[propertyName] = propertyValue;

    savePlayerCharacter(playerCharacter);
};

/**
 * Get the player character object from local storage.
 * @returns {Object} Full character object.
 */
export const getPlayerCharacter = function() {
    if (cachedPlayerCharacter !== null) return cachedPlayerCharacter;

    const playerCharacterString = localStorage.getItem(PLAYER_CHARACTER_KEY);
    try {
        cachedPlayerCharacter = playerCharacterString ? JSON.parse(playerCharacterString) : null;

        if (cachedPlayerCharacter === null) {
            const defaultCharacter = getDefaultPlayerCharacter();
            savePlayerCharacter(defaultCharacter);
        }

        return cachedPlayerCharacter;
    } catch (error) {
        console.error("Error parsing player character JSON:", error);
        return {};
    }
};

/**
 * Save the player character object to local storage.
 * @param {Object} playerCharacter PC as JSON.
 */
export const savePlayerCharacter = function(playerCharacter) {

    try {
        const playerCharacterString = JSON.stringify(playerCharacter);
        localStorage.setItem(PLAYER_CHARACTER_KEY, playerCharacterString);
        cachedPlayerCharacter = playerCharacter;
    }
    catch (error) {
        console.error("Error while saving Player Character:", error);
        console.log("Player Character JSON:", playerCharacter);
    }
};

/**
 * Get a player character with default values.
 * Used to initialize the page for newcomers.
 * @returns {Object} A full object containing default values for all PC properties.
 */
export const getDefaultPlayerCharacter = function() {
    return {
        name: null,
        classes: [],
        race: null,
        background: null,
        alignment: null,
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        cha: 10,
        proficiencies: [],
        expertises: [],
        weapon_proficiencies: [],
        armor_proficiencies: [],
        inventory_weapons: [],
        inventory_armor: [],
        notes: null
    };
}