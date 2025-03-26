import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class SkillProficiencyCheckbox extends HTMLInputElement {

    constructor(skill) {
        super();

        this.skill = skill;
        
        this.type = "checkbox";

        this.checked = globalPlayerCharacter.isProficientInSkill(this.skill.index);

        this.onclick = () => this.handleChange();
    }
    
    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("skillExpertiseChanged", this._updateHandler);
    }
  
    handleChange() {

        if (this.checked) {
            globalPlayerCharacter.addProficiencyInSkill(this.skill.index);
        }
        else {
            globalPlayerCharacter.removeProficiencyInSkill(this.skill.index);
        }

        document.dispatchEvent(new CustomEvent("skillProficiencyChanged", {
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
        if (!event || event.type === "skillExpertiseChanged" && event.detail.skill === this.skill.index) {
            if (globalPlayerCharacter.isExpertInSkill(this.skill.index)) {
                this.disabled = true;
            }
            else {
                this.disabled = false;
            }
        }
    }
}

customElements.define("skill-proficiency-checkbox", SkillProficiencyCheckbox, { extends: 'input' });