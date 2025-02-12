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
 * @param {object} propertyValue
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

/**
 * Get a player character with default values.
 * Used to initialize the page for newcomers.
 * @returns {object} A full object containing default values for all PC properties.
 */
const getDefaultPlayerCharacter = function() {
    return {
        name: null,
        classes: [],
        race: null,
        background: null,
        alignment: null,
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        proficiencies: [],
        expertises: [],
        weapon_proficiencies: [],
        armor_proficiencies: [],
        inventory_weapons: [],
        inventory_armor: [],
        notes: null
    };
}