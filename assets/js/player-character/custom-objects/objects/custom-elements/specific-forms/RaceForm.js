import { Language } from "../../../../objects/api/resources/Language.js";
import { Proficiency } from "../../../../objects/api/resources/Proficiency.js";
import { Race } from "../../../../objects/api/resources/Race.js";
import { Subrace } from "../../../../objects/api/resources/Subrace.js";
import { Trait } from "../../../../objects/api/resources/Trait.js";
import { CustomObjectBaseForm } from "../CustomObjectBaseForm.js";
import { AbilityBonusesSection } from "../helpers/AbilityBonusesSection.js";
import { ChoiceSection } from "../helpers/ChoiceSection.js";
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

        super.connectedCallback();
    }

    async getFormBody() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(this.getInput("Speed", 'speed', this.race.speed, true));

        this.abilityBonusesSection = new AbilityBonusesSection(this.race);
        fragment.appendChild(this.abilityBonusesSection);

        fragment.appendChild(this.getTextarea("Age", 'age', this.race.age));
        fragment.appendChild(this.getTextarea("Alignment", 'alignment', this.race.alignment));
        fragment.appendChild(this.getSelect("Size", "size", this.race.size, ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"]));
        fragment.appendChild(this.getTextarea("Size description", 'size_description', this.race.size_description));

        this.startingProficienciesSection = new LinkedObjectsSection(
            "Starting proficiencies", 
            (await Proficiency.getAllAsync()).results, 
            this.race.starting_proficiencies
        );
        fragment.appendChild(this.startingProficienciesSection);

        fragment.appendChild(new ChoiceSection("Starting proficiency options", this.race.starting_proficiency_options));

        this.languagesSection = new LinkedObjectsSection(
            "Languages", 
            (await Language.getAllAsync()).results, 
            this.race.languages
        );
        fragment.appendChild(this.languagesSection);

        fragment.appendChild(this.getTextarea("Language description", 'language_desc', this.race.language_desc));

        this.traitsSection = new LinkedObjectsSection(
            "Traits", 
            (await Trait.getAllAsync()).results, 
            this.race.traits
        );
        fragment.appendChild(this.traitsSection);

        this.subracesSection = new LinkedObjectsSection(
            "Subraces", 
            (await Subrace.getAllAsync()).results, 
            this.race.subraces
        );
        fragment.appendChild(this.subracesSection);

        return fragment;
    }

    /**
     * 
     * @returns {Race}
     */
    getFormData() {

        const data = new Race(super.getFormData());

        data.ability_bonuses = this.abilityBonusesSection.getValue();
        data.starting_proficiencies = this.startingProficienciesSection.getValue();
        data.languages = this.languagesSection.getValue();
        data.traits = this.traitsSection.getValue();
        data.subraces = this.subracesSection.getValue();

        return data;
    }
}

customElements.define('race-form', RaceForm, { extends: 'form' });