import { Proficiency } from "../../../../objects/api/resources/Proficiency.js";
import { Race } from "../../../../objects/api/resources/Race.js";
import { Trait } from "../../../../objects/api/resources/Trait.js";
import { CustomObjectBaseForm } from "../CustomObjectBaseForm.js";
import { AbilityBonusesSection } from "../helpers/AbilityBonusesSection.js";
import { LinkedObjectsSection } from "../helpers/LinkedObjectsSection.js";

export class RaceForm extends CustomObjectBaseForm {
    /**
     *
     */
    constructor(raceElement) {
        super();
        
        /** @type {Race} */
        this.race = raceElement;
    }

    async connectedCallback() {
        this.appendChild(await this.getFormBody());
    }

    async getFormBody() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(this.getInput("Speed", 'speed', this.race.speed, true));
        fragment.appendChild(new AbilityBonusesSection(this.race));
        fragment.appendChild(this.getTextarea("Age", 'age', this.race.age));
        fragment.appendChild(this.getTextarea("Alignment", 'alignment', this.race.alignment));
        fragment.appendChild(this.getSelect("Size", "size", this.race.size, ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"]));
        fragment.appendChild(this.getTextarea("Size description", 'size-description', this.race.size_description));
        fragment.appendChild(new LinkedObjectsSection("Starting proficiencies", (await Proficiency.getAllAsync()).results, this.race.starting_proficiencies));
        fragment.appendChild(this.getTextarea("Language description", 'language-description', this.race.language_desc));
        fragment.appendChild(new LinkedObjectsSection("Traits", (await Trait.getAllAsync()).results, this.race.traits));

        return fragment;
    }
}

customElements.define('race-form', RaceForm, { extends: 'form' });