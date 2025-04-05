import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class CharacterResetDialog extends HTMLDialogElement {
    /**
     *
     */
    constructor() {
        super();

        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        this.heading = document.createElement('h2');
        this.heading.textContent = "Reset PC";

        this.firstParagraph = document.createElement('p');
        this.firstParagraph.textContent = "By resetting the PC, you will set the page to the same state it was when you loaded the page for the first time. All data will be removed and default values will be assigned to each property.";

        this.secondParagraph = document.createElement('p');

        this.warningText = document.createElement('strong');
        this.warningText.textContent = "Warning: resetting the page will remove all data. Export the data first to create a backup if you do not want to lose any data.";

        this.secondParagraph.appendChild(this.warningText);

        this.resetButton = document.createElement('button');
        this.resetButton.textContent = "Reset";
        this.resetButton.type = 'button';
        this.resetButton.classList.add('reset');
        this.resetButton.onclick = () => this.handleResetButtonClick();

        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.secondParagraph);
        this.dialogContent.appendChild(this.resetButton);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);        
    }

    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("characterResetButtonClicked", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("characterResetButtonClicked", this._updateHandler);
    }

    showDialog() {
        this.showModal();
    }

    handleResetButtonClick() {
        globalPlayerCharacter.reset();
        window.location.reload();
    }

    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('character-reset-dialog', CharacterResetDialog, { extends: 'dialog'});