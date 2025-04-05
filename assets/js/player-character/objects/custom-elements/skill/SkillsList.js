import { Skill } from "../../api/resources/Skill.js";
import { SkillDisplay } from "./SkillDisplay.js";

export class SkillsList extends HTMLUListElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.classList.add('no-style-list');
        this.classList.add('proficiencies-list');
        this.classList.add('three-columns-list');
    }

    async connectedCallback() {
        
        const allSkills = await Skill.getAllAsync();

        for (const skillInfo of allSkills.results) {
            const skill = await Skill.getAsync(skillInfo.index);

            this.appendChild(new SkillDisplay(skill));
        }
    }
}

customElements.define('skills-list', SkillsList, { extends: 'ul' });