export class CharacterImportButton extends HTMLButtonElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.type = 'button';
        this.textContent = "Import";

        this.onclick = () => this.handleClick();
    }
    
    handleClick() {
        document.dispatchEvent(new Event('characterImportButtonClicked'));
    }
}

customElements.define('character-import-button', CharacterImportButton, { extends: 'button' });