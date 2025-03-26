import { Skill } from "../../api/resources/Skill.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class SkillModifierDisplay extends HTMLElement {
    /**
     * 
     * @param {Skill} skill 
     */
    constructor(skill) {
        super();

        this.skill = skill;
    }
    
    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("proficiencyBonusChanged", this._updateHandler);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.addEventListener("skillProficiencyChanged", this._updateHandler);
        document.addEventListener("skillExpertiseChanged", this._updateHandler);
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            this.updateSkillModifier();
        }
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    getShouldUpdate(event) {
        return !event || 
            (event.type === "proficiencyBonusChanged") ||
            (event.type === "abilityScoreModifierChanged" && event.detail.ability === this.skill.ability_score.index) ||
            (event.type === "skillProficiencyChanged" && event.detail.skill === this.skill.index) ||
            (event.type === "skillExpertiseChanged" && event.detail.skill === this.skill.index)
    }

    updateSkillModifier() {
        this.textContent = globalPlayerCharacter.getSkillModifier(this.skill);

        document.dispatchEvent(new CustomEvent("skillModifierChanged", {
            detail: { 
                skill: this.skill.index 
            },
            bubbles: true
        }));
    }
}

customElements.define("skill-modifier-display", SkillModifierDisplay);