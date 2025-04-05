import { PlayerCharacter } from "../../PlayerCharacter.js";

export class CharacterImportDialog extends HTMLDialogElement {
    /**
     *
     */
    constructor() {
        super();

        this.dialogContent = document.createElement('div');
        this.dialogContent.classList.add("dialog-content");

        this.heading = document.createElement('h2');
        this.heading.textContent = "Import PC";

        this.firstParagraph = document.createElement('p');
        this.firstParagraph.textContent = "Use this window to import all information needed to build the PC Builder page. Only the data provided by an export should be used while importing. Using anything else may result in loss of data. Create a backup of the current data by exporting it before importing new data to prevent overwriting existing data.";

        this.secondParagraph = document.createElement('p');
        this.secondParagraph.textContent = "Select a JSON file below, then press the <code>Import</code> button to import the data.";

        this.importButtonAndLabel = document.createElement('div');

        this.importButton = document.createElement('button');
        this.importButton.textContent = "Import";
        this.importButton.type = 'button';
        this.importButton.classList.add('import');
        this.importButton.disabled = true;
        this.importButton.onclick = () => this.handleImportButtonClick();

        this.fileInput = document.createElement('input');
        this.fileInput.type = "file";
        this.fileInput.classList.add("load");
        this.fileInput.onchange = (e) => this.handleFileInputChange(e);

        this.previewLabel = document.createElement('label');
        this.previewLabel.textContent = "Preview";
        this.previewLabel.classList.add("import-preview");

        this.importButtonAndLabel.appendChild(this.importButton);
        this.importButtonAndLabel.appendChild(this.fileInput);
        this.importButtonAndLabel.appendChild(this.previewLabel);

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
        this.dialogContent.appendChild(this.importButtonAndLabel);
        this.dialogContent.appendChild(this.previewTextarea);
        this.dialogContent.appendChild(this.closeButton);

        this.appendChild(this.dialogContent);        
    }

    connectedCallback() {
        this._updateHandler = () => this.showDialog();
        document.addEventListener("characterImportButtonClicked", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("characterImportButtonClicked", this._updateHandler);
    }

    showDialog() {
        this.showModal();
    }

    handleFileInputChange(e) {
        const reader = new FileReader();

        reader.readAsText(e.target.files[0]);
        reader.onload = (readerEvent) => {
            try {
                var playerCharacter = JSON.parse(readerEvent.target.result);
                this.previewTextarea.value = JSON.stringify(playerCharacter, null, 2);
                this.importButton.removeAttribute("disabled");
            }
            catch {
                this.previewTextarea.value = "Could not load file. Make sure you selected the .json file provided by the export.";
                this.importButton.setAttribute("disabled", "disabled");
            }
        }
    }

    handleImportButtonClick() {

        const playerCharacter = new PlayerCharacter(JSON.parse(this.previewTextarea.value));

        playerCharacter.save();
        window.location.reload();
    }

    handleCloseButtonClick() {
        this.close();
    }
}

customElements.define('character-import-dialog', CharacterImportDialog, { extends: 'dialog'});