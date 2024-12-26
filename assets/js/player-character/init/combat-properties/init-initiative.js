import { updateInitiativeModifier } from "../../util.js";

/**
 * Initialize the initiative modifier field.
 * For now just calculate the initiative and display the correct number.
 */
export const initInitiative = function() {
    updateInitiativeModifier();
}