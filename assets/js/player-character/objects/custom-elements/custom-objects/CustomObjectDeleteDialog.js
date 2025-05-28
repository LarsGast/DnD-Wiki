import { globals } from "../../../load-page.js";

/**
 * Custom HTML element for displaying the CustomObject Delete Dialog.
 * Extends HTMLDialogElement.
 *
 * The dialog warns the user about data loss, upon confirmation deletes the selected customObject.
 */
export class CustomObjectDeleteDialog extends HTMLDialogElement {
    
    constructor() {
        super();

        // Container div for dialog content.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Dialog heading.
        this.heading = document.createElement('h2');
        this.heading.textContent = "Delete Custom Object";

        // Paragraph with a warning. It contains emphasized text.
        this.firstParagraph = document.createElement('p');
        this.warningText = document.createElement('strong');
        this.warningText.textContent = "Warning: deleting this object will remove all data for the selected object. Consider exporting the object first to create a backup if you do not want to lose any data. This data cannot be recovered once deleted.";
        this.firstParagraph.appendChild(this.warningText);

        // Delete button.
        this.deleteButton = document.createElement('button');
        this.deleteButton.textContent = "Delete";
        this.deleteButton.type = 'button';
        this.deleteButton.classList.add('delete');
        this.deleteButton.onclick = () => this.handleDeleteButtonClick();

        // Close button.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        // Assemble dialog content.
        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.deleteButton);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);        
    }

    /**
     * Called when the element is connected to the DOM.
     * Registers an event listener for "customObjectDeleteButtonClicked".
     */
    connectedCallback() {
        this._updateHandler = (event) => this.showDialog(event);
        document.addEventListener("customObjectDeleteButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("customObjectDeleteButtonClicked", this._updateHandler);
    }

    /**
     * Opens the dialog.
     * @param {CustomEvent} event Custom event containing information about the selected customObject.
     */
    showDialog(event) {

        // Set the PC ID here to use on confirmation.
        this.customObjectId = event.detail.customObjectId;

        this.showModal();
    }
  
    /**
     * Handles reset button clicks.
     * Simply remove the customObject from the bank, close the dialog, and reload the UI.
     */
    handleDeleteButtonClick() {

        globals.customObjectBank.removeCustomObjectFromBank(this.customObjectId);
        globals.customObjectBank.save();

        this.close();

        document.dispatchEvent(new Event("customObjectDeleted"));
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('custom-object-delete-dialog', CustomObjectDeleteDialog, { extends: 'dialog' });