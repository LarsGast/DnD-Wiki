import { getElementWithTextContent } from "../../../util.js";
import { CustomObjectTable } from "./CustomObjectTable.js";

/**
 * Custom HTML element for displaying the saved custom objects in storage.
 * Extends HTMLDialogElement.
 *
 * The dialog shows the user all their custom objects (active and inactive) and lets them switch, export, import, and delete.
 */
export class ManageCustomObjectsDialog extends HTMLDialogElement {
    
    constructor() {
        super();
        
        // Container div for styling the content of the dialog.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Create a heading for the dialog.
        this.heading = getElementWithTextContent("h2", "Manage Custom Objects");

        // User friendly description.
        this.firstParagraph = getElementWithTextContent("p", "Since this page only has access to the SRD, the class, subclass, race, background, etc that you want to add to your characters might not be available. Thats why, in this menu, you can create your own objects.");
        
        // New custom object button.
        this.createNewCustomObject = document.createTextNode("New");

        // Import button.
        this.importButton = document.createTextNode("Import");

        this.customObjectTableContainer = document.createElement('div');
        this.customObjectTableContainer.className = "table-container";
        this.customObjectTableContainer.appendChild(new CustomObjectTable());

        // Close button.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.createNewCustomObject);
        this.dialogContent.appendChild(this.importButton);
        this.dialogContent.appendChild(this.customObjectTableContainer);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for the "manageCustomObjectsButtonClicked" event to show the dialog.
     */
    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("manageCustomObjectsButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("manageCustomObjectsButtonClicked", this._updateHandler);
    }

    /**
     * Opens the dialog and fires off an event to let the page know it is opened.
     */
    showDialog() {
        this.showModal();

        document.dispatchEvent(new Event('manageCustomObjectsDialogOpened'));
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('manage-custom-objects-dialog', ManageCustomObjectsDialog, { extends: 'dialog' });