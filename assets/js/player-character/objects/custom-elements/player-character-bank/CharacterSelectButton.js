import { globalPlayerCharacterBank } from "../../../load-page.js";

/**
 * Custom HTML element for displaying and handling the button to open the Character Select Dialog.
 * Extends HTMLButtonElement.
 */
export class CharacterSelectButton extends HTMLButtonElement {
    
    constructor(characterId) {
        super();
        
        // Set type and text.
        this.characterId = characterId;
        this.type = 'button';
        this.textContent = "Select";

        // Bind click event to trigger the select dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click.
     */
    handleClick() {
        globalPlayerCharacterBank.setActiveCharacter(this.characterId);
        globalPlayerCharacterBank.save();
        
        window.location.reload();
    }
}

customElements.define('character-select-button', CharacterSelectButton, { extends: 'button' });