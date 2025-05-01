/**
 * Custom HTML element for displaying and handling the button to open the Character Reset Dialog.
 * Extends HTMLButtonElement.
 */
export class CharacterResetButton extends HTMLButtonElement {
    
    constructor(characterId) {
        super();
        
        // Set type and text.
        this.characterId = characterId;
        this.type = 'button';
        this.textContent = "Delete";

        // Bind click event to trigger the reset dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "characterResetButtonClicked" event.
     */
    handleClick() {
        document.dispatchEvent(new CustomEvent("characterResetButtonClicked", {
            detail: { 
                characterId: this.characterId 
            },
            bubbles: true
        }));
    }
}

customElements.define('character-reset-button', CharacterResetButton, { extends: 'button' });