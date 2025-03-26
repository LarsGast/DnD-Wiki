import { globalPlayerCharacter } from "./PlayerCharacter.js";

export class ProficiencyBonusDisplay extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = () => this.updateDisplay();
        document.addEventListener("classesUpdated", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("classesUpdated", this._updateHandler);
    }
    
    updateDisplay() {
        
        // Update the display.
        this.textContent = globalPlayerCharacter.getProficiencyBonus();

        document.dispatchEvent(new Event("proficiencyBonusChanged"));
    }
}
  
customElements.define("proficiency-bonus-display", ProficiencyBonusDisplay);