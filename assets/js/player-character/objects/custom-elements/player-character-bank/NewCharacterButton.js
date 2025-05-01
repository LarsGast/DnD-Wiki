import { globalPlayerCharacterBank } from "../../../load-page.js";
import { PlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom HTML element for displaying and handling the button to add a new character.
 * Extends HTMLButtonElement.
 */
export class NewCharacterButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set type and display text.
        this.type = 'button';
        this.textContent = "New";

        // Bind click event to dispatch an event to open the import dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click.
     */
    handleClick() {
        globalPlayerCharacterBank.addNewCharacter(PlayerCharacter.getDefault());
        globalPlayerCharacterBank.save();

        document.dispatchEvent(new Event("newCharacterCreated"));
    }
}

customElements.define('new-character-button', NewCharacterButton, { extends: 'button' });