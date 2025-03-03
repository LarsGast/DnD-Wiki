import { initAbilityScores } from "./init-ability-scores.js";
import { initEquipmentProficiencies } from "./init-equipment-proficiencies.js";
import { initExportImportButtons } from "./init-export-import-buttons.js";
import { initInventory } from "./init-inventory.js";
import { initMainProperties } from "./init-main-properties.js";
import { initNotes } from "./init-notes.js";
import { initSkills } from "./init-skills.js";

/**
 * Initialize all elements on the PC builder page.
 */
export const initPage = async function() {
    initExportImportButtons();
    await initMainProperties();
    initAbilityScores();
    await initSkills();
    initEquipmentProficiencies();
    await initInventory();
    initNotes();
}