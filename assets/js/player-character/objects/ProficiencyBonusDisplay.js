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
        // Calculate the total level from all classes.
        const classes = globalPlayerCharacter.classes || [];
        const totalLevel = classes.reduce((sum, cls) => sum + (cls.level || 0), 0);
        
        let bonus = 2;
        if (totalLevel >= 5 && totalLevel <= 8) bonus = 3;
        else if (totalLevel >= 9 && totalLevel <= 12) bonus = 4;
        else if (totalLevel >= 13 && totalLevel <= 16) bonus = 5;
        else if (totalLevel >= 17) bonus = 6;
        
        // Update the display.
        this.textContent = bonus;
    }
  }
  
  customElements.define("proficiency-bonus-display", ProficiencyBonusDisplay);