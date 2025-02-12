import { getPlayerCharacter } from "../../local-storage-util.js";
import { showModal } from "../util.js";

/**
 * Initialize all export and import buttons functionality.
 */
export const initExportImportButtons = function() {
    initExportButton();
}

/**
 * Initialize the export button.
 */
const initExportButton = function() {
    const button = document.getElementById("export-button");

    button.onclick = () => {
        showModal(getExportModalContent());
    }
}

/**
 * Get all HTML elements needed for the export button modal.
 * @returns {HTMLElement[]}
 */
const getExportModalContent = function() {
    return [
        getExportModalTitle(), 
        getExportModalMessage(), 
        getExportModalTextarea()
    ];
}

/**
 * Get the title element for the export modal.
 * @returns {HTMLHeadingElement}
 */
const getExportModalTitle = function() {
    const h2 = document.createElement('h2');

    h2.textContent = "Export PC";

    return h2;
}

/**
 * Get the message element for the export modal.
 * @returns {HTMLParagraphElement}
 */
const getExportModalMessage = function() {
    const p = document.createElement('p');

    p.textContent = "Export your PC here!";

    return p;
}

/**
 * Get the textarea for the export modal to display the entire PC for exporting.
 * Includes the stringified JSON of the PC.
 * @returns {HTMLTextAreaElement}
 */
const getExportModalTextarea = function() {
    const textArea = document.createElement('textarea');

    textArea.textContent = JSON.stringify(getPlayerCharacter(), null, 2);

    return textArea;
}