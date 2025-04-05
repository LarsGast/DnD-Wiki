import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class CharacterExportDialog extends HTMLDialogElement {
    /**
     *
     */
    constructor() {
        super();

        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        this.heading = document.createElement('h2');
        this.heading.textContent = "Export PC";

        this.firstParagraph = document.createElement('p');
        this.firstParagraph.textContent = "Use this window to download all information needed to build the PC Builder page. You can use this feature to save backups, move characters between devices, and more.";

        this.secondParagraph = document.createElement('p');
        this.secondParagraph.textContent = "Use the Import button to import the information into the page using the resulting JSON file from this export.";

        this.exportButtonAndLabel = document.createElement('div');

        this.exportButton = document.createElement('button');
        this.exportButton.textContent = "Download";
        this.exportButton.type = 'button';
        this.exportButton.classList.add('download');
        this.exportButton.onclick = () => this.handleExportButtonClick();

        this.previewLabel = document.createElement('label');
        this.previewLabel.textContent = "Preview";
        this.previewLabel.classList.add("export-preview");

        this.exportButtonAndLabel.appendChild(this.exportButton);
        this.exportButtonAndLabel.appendChild(this.previewLabel);

        this.previewTextarea = document.createElement('textarea');
        this.previewTextarea.disabled = true;

        this.closeButton = document.createElement('button');
        this.closeButton.textContent = "Close";
        this.closeButton.type = 'button';
        this.closeButton.classList.add('close');
        this.closeButton.onclick = () => this.handleCloseButtonClick();

        this.dialogContent.appendChild(this.heading);
        this.dialogContent.appendChild(this.firstParagraph);
        this.dialogContent.appendChild(this.secondParagraph);
        this.dialogContent.appendChild(this.exportButtonAndLabel);
        this.dialogContent.appendChild(this.previewTextarea);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);        
    }

    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("characterExportButtonClicked", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("characterExportButtonClicked", this._updateHandler);
    }

    showDialog() {
        this.showModal();
        this.previewTextarea.value = JSON.stringify(globalPlayerCharacter, null, 2);
    }

    handleExportButtonClick() {
        
        // Create the blob and url for download.
        const blob = new Blob(
            [JSON.stringify(globalPlayerCharacter, null, 2)],
            { type: 'application/json' }
        );
        const url = URL.createObjectURL(blob);

        // You cannot provide a file as download with a <button> element alone, you need an <a> element.
        // That's why we create an anchor tag and trigger a click here.
        const a = document.createElement('a');
        a.href = url;
        a.download = `${globalPlayerCharacter.name}.json`;
        a.click();

        // Release memory to prevent potential memory leaks.
        URL.revokeObjectURL(url);
    }

    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('character-export-dialog', CharacterExportDialog, { extends: 'dialog'});