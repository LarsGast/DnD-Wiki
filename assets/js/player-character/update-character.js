import { getDefaultPlayerCharacter } from "../local-storage-util.js";
import { update_version_2 } from "./update/update-version-2.js";

/**
 * Update an old player character object to a new version.
 * This function should be able to convert a PC from any old version to any newer version.
 * @param {JSON} playerCharacter Full JSON object of the character.
 */
export const updateCharacter = function(playerCharacter) {

    // Update if needed.
    if (!playerCharacter.version || playerCharacter.version < 2) {
        update_version_2(playerCharacter);
        playerCharacter.version = 2;
    }

    // Always clean.
    cleanPlayerCharacter(playerCharacter);
}

/**
 * Clean the PC JSON so it EXACTLY has the properties needed for the PC-Builder page.
 * This is always based on the current version of the PC blueprint.
 * @param {JSON} playerCharacter 
 */
const cleanPlayerCharacter = function(playerCharacter) {
    const defaultCharacter = getDefaultPlayerCharacter();

    // Remove unwanted keys
    for (const key in playerCharacter) {
        if (!defaultCharacter.hasOwnProperty(key)) {
            delete playerCharacter[key];
        }
    }

    // Add missing keys with default values
    for (const key in defaultCharacter) {
        if (!playerCharacter.hasOwnProperty(key)) {
            playerCharacter[key] = defaultCharacter[key];
        }
    }
}