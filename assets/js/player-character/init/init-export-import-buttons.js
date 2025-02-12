import { getPlayerCharacter, getPlayerCharacterProperty } from "../../local-storage-util.js";

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
    initExportCopyButton(dialog);
    initExportDownloadButton(dialog);
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
    const closeButton = dialog.querySelector('.close');

    closeButton.onclick = () => {
        dialog.close();
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

        copyButton.textContent = "Copied!";

        setTimeout(() =>  {
            copyButton.textContent = 'Copy to Clipboard'
        }, 2000);
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