import { getPlayerCharacter, savePlayerCharacter } from "../local-storage-util.js";
import { update_version_2 } from "./update/update-version-2.js";

/**
 * Update an old player character object to a new version.
 * @param {JSON} playerCharacter Full JSON object of the character. Optional.
 */
export const updateCharacter = function(playerCharacter = undefined) {

    // Get the current character if none is given.
    if (!playerCharacter) {
        playerCharacter = getPlayerCharacter();
    }

    let hasChanges = false;

    // Update if needed.
    if (!playerCharacter.version || playerCharacter.version < 2) {
        update_version_2(playerCharacter);
        playerCharacter.version = 2;
        hasChanges = true;
    }

    // Save the updated character.
    if (hasChanges) {
        savePlayerCharacter(playerCharacter);
    }
}