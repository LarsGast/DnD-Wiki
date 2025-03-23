import { AbilityScoreInput } from "./AbilityScoreInput.js";
import { AbilityScoreModifierDisplay } from "./AbilityScoreModifierDisplay.js";

export class AbilityScoreDisplay extends HTMLElement {
    constructor() {
        super();

        this.ability = this.getAttribute("ability");

        this.displayLabel = document.createElement('span');
        this.displayLabel.textContent = this.ability.toUpperCase();

        this.modifierDisplay = new AbilityScoreModifierDisplay(this.ability);

        this.scoreInput = new AbilityScoreInput(this.ability);

        this.appendChild(this.displayLabel);
        this.appendChild(this.modifierDisplay);
        this.appendChild(this.scoreInput);
    }
}

customElements.define('ability-score-display', AbilityScoreDisplay);