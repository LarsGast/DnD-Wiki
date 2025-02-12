import { getPlayerCharacter } from "../../local-storage-util.js";

/**
 * Initialize all export and import functionality.
 */
export const initExportImportButtons = function() {
    initExportFunctionality();
}

/**
 * Initialize export button functionality.
 */
const initExportFunctionality = function() {

    const dialog = document.getElementById('export-dialog');

    initExportDialogOpenButton(dialog);
    initExportDialogCloseButton(dialog);
}

/**
 * Initialize the export dialog open button.
 * @param {HTMLDialogElement} dialog 
 */
const initExportDialogOpenButton = function(dialog) {
    const button = document.getElementById("export-button");

    button.onclick = () => {
        fillExportTextarea(dialog);
        dialog.showModal();
    }
}

/**
 * Initialize the export dialog close button.
 * @param {HTMLDialogElement} dialog 
 */
const initExportDialogCloseButton = function(dialog) {
    const closeButton = dialog.querySelector('button');

    closeButton.onclick = () => {
        dialog.close();
    }
}

/**
 * Fill the textarea of the export PC dialog with a stringified JSON of the PC information.
 * @param {HTMLDialogElement} dialog 
 */
const fillExportTextarea = function(dialog) {
    const textArea = dialog.querySelector('textarea');

    textArea.textContent = JSON.stringify(getPlayerCharacter(), null, 2);
}