import { initClassAndLevel } from "./main-properties/init-class.js";
import { initName } from "./main-properties/init-name.js";

/**
 * Initialize all elements for the main properties on the PC builder page.
 */
export const initMainProperties = async function() {
    initName();
    initClassAndLevel();
}