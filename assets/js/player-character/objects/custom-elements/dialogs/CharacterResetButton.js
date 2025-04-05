export class CharacterResetButton extends HTMLButtonElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.type = 'button';
        this.textContent = "Reset";

        this.onclick = () => this.handleClick();
    }
    
    handleClick() {
        document.dispatchEvent(new Event('characterResetButtonClicked'));
    }
}

customElements.define('character-reset-button', CharacterResetButton, { extends: 'button' });