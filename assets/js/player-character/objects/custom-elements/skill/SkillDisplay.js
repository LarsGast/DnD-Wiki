import { Skill } from "../../api/resources/Skill.js";
import { SkillModifierDisplay } from "./SkillModifierDisplay.js";
import { SkillProficiencyCheckbox } from "./SkillProficiencyCheckbox.js";
import { SkillExpertiseCheckbox } from "./SkillExpertiseCheckbox.js";

export class SkillDisplay extends HTMLElement {

    /**
     * 
     * @param {Skill} skill 
     */
    constructor(skill) {
        super();

        this.skill = skill;

        this.proficiencyCheckbox = new SkillProficiencyCheckbox(this.skill);
        this.expertiseCheckbox = new SkillExpertiseCheckbox(this.skill);
        this.modifierDisplay = new SkillModifierDisplay(this.skill);
        this.skillNameDisplay = document.createElement('span');
        this.skillNameDisplay.textContent = ` ${this.skill.name} (${this.skill.ability_score.name})`;

        this.appendChild(this.proficiencyCheckbox);
        this.appendChild(this.expertiseCheckbox);
        this.appendChild(this.modifierDisplay);
        this.appendChild(this.skillNameDisplay);
    }
}

customElements.define('skill-display', SkillDisplay);