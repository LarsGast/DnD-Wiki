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
}