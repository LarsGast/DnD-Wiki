import { updateCharacter } from "./update-character.js";
import { buildPage } from "./build/build-page.js";
import { initPage } from "./init/init-page.js"
import { globalPlayerCharacter } from "./objects/PlayerCharacter.js";
import "./objects/custom-elements/ability-score/AbilityScoreDisplay.js";
import "./objects/custom-elements/inventory/InventoryWeaponAddInput.js";
import "./objects/custom-elements/inventory/InventoryWeaponTable.js";
import "./objects/custom-elements/inventory/InventoryArmorAddInput.js";
import "./objects/custom-elements/inventory/InventoryArmorTable.js";
import "./objects/custom-elements/generic-info/ProficiencyBonusDisplay.js";
import "./objects/custom-elements/equipment-proficiencies/ArmorProficiencyDisplay.js";
import "./objects/custom-elements/equipment-proficiencies/WeaponProficiencyDisplay.js";
import "./objects/custom-elements/generic-info/RaceInput.js";
import "./objects/custom-elements/race/RaceFeaturesDisplay.js";
import "./objects/custom-elements/generic-info/SubraceInput.js";
import "./objects/custom-elements/subrace/SubraceFeaturesDisplay.js";
import "./objects/custom-elements/generic-info/BackgroundInput.js";
import "./objects/custom-elements/generic-info/AlignmentInput.js";
import "./objects/custom-elements/generic-info/NameInput.js";
import "./objects/custom-elements/notes/NotesTextArea.js";
import "./objects/custom-elements/generic-info/ClassLevelSection.js";
import "./objects/custom-elements/skill/SkillsList.js";

/**
 * Starting point for all JavaScript code for the PC-Builder page.
 * This one function should bring the page to a functioning state.
 */
export const loadPage = async function() {

    // Update the current PC to the latest version so the data and inputs know how to interact with each other.
    updateCharacterToLatestVersion();

    // Build all elements that should appear on the page.
    await buildPage();

    // Initialize all elements that appear on the page.
    await initPage()
}

/**
 * If changes have occurred in the JSON definition of the PC, old versions need to be brought up to date.
 */
const updateCharacterToLatestVersion = function() {

    // Update the PC currently saved in localStorage.
    updateCharacter(globalPlayerCharacter);

    // Save the PC, wether it has changes or not.
    // We don't need to check for changes. Saving is cheap and the extra logic will only bring complexity.
    globalPlayerCharacter.save();
}