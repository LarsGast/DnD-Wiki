export class CharacterExportButton extends HTMLButtonElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.type = 'button';
        this.textContent = "Export";

        this.onclick = () => this.handleClick();
    }
    
    handleClick() {
        document.dispatchEvent(new Event('characterExportButtonClicked'));
    }
}

customElements.define('character-export-button', CharacterExportButton, { extends: 'button' });