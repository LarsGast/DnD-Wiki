import { globalPlayerCharacter } from "./PlayerCharacter.js";

export class AbilityScoreModifierDisplay extends HTMLElement {

    constructor(ability) {
        super();

        this.ability = ability;
    }

    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("abilityScoreChanged", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("abilityScoreChanged", this._updateHandler);
    }
  
    handleChange() {

        document.dispatchEvent(new CustomEvent("abilityScoreModifierChanged", {
            detail: { 
                ability: this.ability 
            },
            bubbles: true
        }));
    }
    
    updateDisplay(event) {
        if (!event || event.detail.ability === this.ability) {
            this.textContent = globalPlayerCharacter.getAbilityModifier(this.ability);
            this.handleChange();
        }
    }
}

customElements.define("ability-score-modifier-display", AbilityScoreModifierDisplay);