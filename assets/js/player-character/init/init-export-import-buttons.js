import { getPlayerCharacter, getPlayerCharacterProperty, savePlayerCharacter } from "../../local-storage-util.js";

/**
 * Initialize all export and import functionality.
 */
export const initExportImportButtons = function() {
    initExportFunctionality();
    initImportFunctionality();
}

/**
 * Initialize export button functionality.
 */
const initExportFunctionality = function() {

    const dialog = document.getElementById('export-dialog');

    initExportDialogOpenButton(dialog);
    initDialogCloseButton(dialog);
    initExportCopyButton(dialog);
    initExportDownloadButton(dialog);
}

/**
 * Initialize import button functionality.
 */
const initImportFunctionality = function() {

    const dialog = document.getElementById('import-dialog');

    initImportDialogOpenButton(dialog);
    initDialogCloseButton(dialog);
    initImportButton(dialog);
}

/**
 * Initialize the dialog close button.
 * @param {HTMLDialogElement} dialog 
 */
const initDialogCloseButton = function(dialog) {
    const closeButton = dialog.querySelector('.close');

    closeButton.onclick = () => {
        dialog.close();
    }
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
 * Initialize the import dialog open button.
 * @param {HTMLDialogElement} dialog 
 */
const initImportDialogOpenButton = function(dialog) {
    const button = document.getElementById("import-button");

    button.onclick = () => {
        dialog.showModal();
    }
}

/**
 * Initialize the copy button in the export dialog.
 * @param {HTMLDialogElement} dialog 
 */
const initExportCopyButton = function(dialog) {
    const copyButton = dialog.querySelector('.copy');

    copyButton.onclick = async () => {
        const textArea = dialog.querySelector('textarea');

        await navigator.clipboard.writeText(textArea.value);
        
        // Flash effect to indicate copy to clipboard has been done.
        textArea.style.backgroundColor = '#d3d3d3'; // Light grey

        setTimeout(() => {
            textArea.style.backgroundColor = '';
        }, 200);
    }
}

/**
 * Initialize the download button in the export dialog.
 * @param {HTMLDialogElement} dialog 
 */
const initExportDownloadButton = function(dialog) {
    const downloadButton = dialog.querySelector('.download');

    downloadButton.onclick = async () => {
        const textArea = dialog.querySelector('textarea');

        // Create the blob and url for download.
        const blob = new Blob([textArea.value], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
    
        // You cannot provide a file as download with a <button> element alone, you need an <a> element.
        // That's why we create an anchor tag and trigger a click here.
        const a = document.createElement('a');
        a.href = url;
        a.download = `${getPlayerCharacterProperty('name')}.json`;
        a.click();

        // Release memory to prevent potential memory leaks.
        URL.revokeObjectURL(url);
    }
}

/**
 * Fill the textarea of the export PC dialog with a stringified JSON of the PC information.
 * @param {HTMLDialogElement} dialog 
 */
const fillExportTextarea = function(dialog) {
    const textArea = dialog.querySelector('textarea');

    textArea.value = JSON.stringify(getPlayerCharacter(), null, 2);
}

/**
 * Initialize the import button.
 * This sets the PC as described and reloads the page to commit changes.
 * @param {HTMLDialogElement} dialog 
 */
const initImportButton = function(dialog) {
    const importButton = dialog.querySelector('.import');

    importButton.onclick = () => {
        const textArea = dialog.querySelector('textarea');
        savePlayerCharacter(JSON.parse(textArea.value));
        window.location.reload();
    }
}