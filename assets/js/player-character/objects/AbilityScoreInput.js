import { globalPlayerCharacter } from "./PlayerCharacter.js";

export class AbilityScoreInput extends HTMLInputElement {
    constructor(ability) {
        super();
        
        this.type = "number";
        this.min = 1;
        this.max = 30;

        this.ability = ability;

        this.onchange = () => this.handleChange();
    }

    connectedCallback() {

        this.value = globalPlayerCharacter[this.ability];

        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("abilityScoreChanged", this._updateHandler);
    }
  
    handleChange() {
        
        globalPlayerCharacter.setProperty(this.ability, this.value);

        document.dispatchEvent(new CustomEvent("abilityScoreChanged", {
            detail: { 
                ability: this.ability 
            },
            bubbles: true
        }));
    }

    updateDisplay(event) {
        
        if (!event || event.detail.ability === this.ability) {
            if (this.value > 30) {
                this.value = 30;
                this.dispatchEvent(new Event('change'));
            }

            if (this.value < 1) {
                this.value = 1;
                this.dispatchEvent(new Event('change'));
            }
        }
    }
}

customElements.define("ability-score-input", AbilityScoreInput, { extends: "input" });