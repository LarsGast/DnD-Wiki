import { globalPlayerCharacter } from "./PlayerCharacter.js";

export class SkillExpertiseCheckbox extends HTMLInputElement {

    constructor(skill) {
        super();

        this.skill = skill;
        
        this.type = "checkbox";

        this.checked = globalPlayerCharacter.isExpertInSkill(this.skill.index);

        this.onclick = () => this.handleChange();
    }
    
    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("skillProficiencyChanged", this._updateHandler);
    }
  
    handleChange() {

        if (this.checked) {
            globalPlayerCharacter.addExpertiseInSkill(this.skill.index);
        }
        else {
            globalPlayerCharacter.removeExpertiseInSkill(this.skill.index);
        }

        document.dispatchEvent(new CustomEvent("skillExpertiseChanged", {
            detail: { 
                skill: this.skill.index 
            },
            bubbles: true
        }));
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    updateDisplay(event) {
        if (!event || event.type === "skillProficiencyChanged" && event.detail.skill === this.skill.index) {
            if (!globalPlayerCharacter.isProficientInSkill(this.skill.index)) {
                this.disabled = true;
            }
            else {
                this.disabled = false;
            }
        }
    }
}

customElements.define("skill-expertise-checkbox", SkillExpertiseCheckbox, { extends: 'input' });