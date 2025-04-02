import { initExportImportButtons } from "./init-export-import-buttons.js";
import { initMainProperties } from "./init-main-properties.js";

/**
 * Initialize all elements on the PC builder page.
 */
export const initPage = async function() {
    initExportImportButtons();
    await initMainProperties();
}