import { getElementWithTextContent } from "../../../util.js"
import { globalPlayerCharacter } from "../../PlayerCharacter.js";
import { CharacterBankTable } from "./CharacterBankTable.js";
import { CharacterImportButton } from "../dialogs/CharacterImportButton.js"

export class ManageCharactersDialog extends HTMLDialogElement {
    /**
     *
     */
    constructor() {
        super();
        
        // Container div for styling the content of the dialog.
        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        // Create a heading for the dialog.
        this.heading = getElementWithTextContent("h2", "Manage characters");

        this.description = getElementWithTextContent("p", "Manage your characters by changing the selected character, exporting a character, deleting a character, and importing a new character.")

        this.importButton = new CharacterImportButton();

        // Create the tables that show all the characters.
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
        this.dialogContent.appendChild(this.description);
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

    showDialog() {

        // Rebuild the tables displaying information about the character(s).
        // TODO: implement being able to have mutltiple characters and add them here second.
        this.currentCharacterTableContainer.replaceChildren(new CharacterBankTable([globalPlayerCharacter], true));
        this.bankedCharactersTableContainer.replaceChildren(new CharacterBankTable([], false));

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