import { updateCharacter } from "./update-character.js";
import { globalPlayerCharacter } from "./objects/PlayerCharacter.js";
import { globalPlayerCharacterBank } from "./objects/PlayerCharacterBank.js";

/**
 * Starting point for all JavaScript code for the PC-Builder page.
 * This one function should bring the page to a functioning state.
 */
export const loadPage = function() {

    updateCharacterBankToLatestVersion();

    // Update the current PC to the latest version so the data and inputs know how to interact with each other.
    updateCharacterToLatestVersion();
}

const updateCharacterBankToLatestVersion = function() {

    if (false) {
        globalPlayerCharacterBank.playerCharacterBankEntries = [];
        globalPlayerCharacterBank.addNewCharacter(globalPlayerCharacter);
    }

    globalPlayerCharacter.save();
}

/**
 * If changes have occurred in the JSON definition of the PC, old versions need to be brought up to date.
 */
const updateCharacterToLatestVersion = function() {

    // Update the PC currently saved in localStorage.
    //updateCharacter(globalPlayerCharacter);

    // Save the PC, wether it has changes or not.
    // We don't need to check for changes. Saving is cheap and the extra logic will only bring complexity.
    //globalPlayerCharacter.save();

    for (const characterBankEntry of globalPlayerCharacterBank.playerCharacterBankEntries) {
        updateCharacter(characterBankEntry.playerCharacter);
    }

    globalPlayerCharacterBank.save();
}