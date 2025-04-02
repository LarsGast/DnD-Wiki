import { buildSkills } from "./build-skills.js";
import { buildEquipmentProficiencies } from "./build-equipment-proficiencies.js";

/**
 * Build the page.
 * This means filling all elements with necessary data and such.
 */
export const buildPage = async function() {
    await buildSkills();
    await buildEquipmentProficiencies();
}