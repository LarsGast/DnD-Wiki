import { getElementWithTextContent } from "../../../util.js"
import { CharacterBankTable } from "./CharacterBankTable.js";
import { CharacterImportButton } from "./CharacterImportButton.js"
import { globalPlayerCharacterBank } from "../../../load-page.js";

/**
 * Custom HTML element for displaying the saved characters in storage.
 * Extends HTMLDialogElement.
 *
 * The dialog shows the user all their characters (active and inactive) and lets them switch, export, import, and delete.
 */
export class ManageCharactersDialog extends HTMLDialogElement {
    
    constructor() {
        super();
        
        // Container div for styling the content of the dialog.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Create a heading for the dialog.
        this.heading = getElementWithTextContent("h2", "Manage characters");

        // User friendly description.
        this.firstParagraph = getElementWithTextContent("p", "Manage your characters by changing the selected character, exporting a character, deleting a character, and importing a new character.");

        // Import button.
        this.importButton = new CharacterImportButton();

        // Create the containers that hold the tables that show information about the characters.
        // These will be filled in showDialog();
        this.currentCharacterTableContainer = document.createElement('div');
        this.currentCharacterTableContainer.className = "table-container";

        this.bankedCharactersTableContainer = document.createElement('div');
        this.bankedCharactersTableContainer.className = "table-container";

        // Close button.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.importButton);
        this.dialogContent.appendChild(this.currentCharacterTableContainer);
        this.dialogContent.appendChild(this.bankedCharactersTableContainer);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for the "manageCharactersButtonClicked" event to show the dialog.
     */
    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("manageCharactersButtonClicked", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("manageCharactersButtonClicked", this._updateHandler);
    }

    /**
     * Builds and opens the dialog.
     */
    showDialog() {

        // Rebuild the tables displaying information about the character(s).
        this.currentCharacterTableContainer.replaceChildren(new CharacterBankTable(true));
        this.bankedCharactersTableContainer.replaceChildren(new CharacterBankTable(false));

        this.showModal();
    }
  
    /**
     * Closes the dialog.
     */
    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('manage-characters-dialog', ManageCharactersDialog, { extends: 'dialog' });