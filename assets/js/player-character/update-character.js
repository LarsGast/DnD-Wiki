import { getPlayerCharacter, savePlayerCharacter } from "../local-storage-util.js";
import { update_2025_02_15 } from "./update/2025-02-15.js";

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
    // TODO: More specific date, not just day, but also time of the release.
    if (!playerCharacter.last_edit || playerCharacter.last_edit < new Date("2025-02-15")) {
        update_2025_02_15(playerCharacter);
        hasChanges = true;
    }

    // Save the updated character.
    if (hasChanges) {
        savePlayerCharacter(playerCharacter);
    }
}