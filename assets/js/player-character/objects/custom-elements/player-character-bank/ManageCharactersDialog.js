import { getElementWithTextContent } from "../../../util.js"
import { globalPlayerCharacter } from "../../PlayerCharacter.js";
import { CharacterBankTable } from "./CharacterBankTable.js";

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

        // Create the tables that show all the characters.
        // These will be filled in showDialog();
        this.currentCharacterTable = document.createElement('table');
        this.bankedCharactersTable = document.createElement('table');

        // Close button.
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.currentCharacterTable);
        this.dialogContent.appendChild(this.bankedCharactersTable);
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
        this.currentCharacterTable = new CharacterBankTable([globalPlayerCharacter]);
        this.bankedCharactersTable = new CharacterBankTable([]);

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