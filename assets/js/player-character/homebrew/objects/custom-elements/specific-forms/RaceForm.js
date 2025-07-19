import { Language } from "../../../../objects/api/resources/Language.js";
import { Race } from "../../../../objects/api/resources/Race.js";
import { Subrace } from "../../../../objects/api/resources/Subrace.js";
import { Trait } from "../../../../objects/api/resources/Trait.js";
import { HomebrewBaseForm } from "../HomebrewBaseForm.js";
import { AbilityBonusesSection } from "../helpers/AbilityBonusesSection.js";
import { ChoiceSection } from "../helpers/ChoiceSection.js";
import { LinkedObjectsSection } from "../helpers/LinkedObjectsSection.js";

/**
 * Form for editing custom homebrew Race objects.
 */
export class RaceForm extends HomebrewBaseForm {

    /**
     * Creates an instance of RaceForm.
     * @param {Race} raceElement
     */
    constructor(raceElement) {
        super();
        
        /** @type {Race} */
        this.race = raceElement;
    }

    /**
     * Initializes the form by appending the form body.
     * This method is called when the element is connected to the DOM.
     * @returns {Promise<void>}
     */
    async connectedCallback() {
        this.appendChild(await this.getFormBody());

        super.connectedCallback();
    }

    /**
     * Creates the body of the form with all necessary sections.
     * @returns {Promise<DocumentFragment>} A fragment containing all the sections of the form.
     */
    async getFormBody() {
        const fragment = document.createDocumentFragment();

        this.abilityBonusesSection = new AbilityBonusesSection(this.race.ability_bonuses, "Racial bonuses to ability scores.");
        fragment.appendChild(this.abilityBonusesSection);

        fragment.appendChild(this.getTextareaSection("Age", 'age', this.race.age, "Flavor description of possible ages for this race."));
        fragment.appendChild(this.getTextareaSection("Alignment", 'alignment', this.race.alignment, "Flavor description of likely alignments this race takes."));
        fragment.appendChild(this.getSelectSection("Size", "size", this.race.size, ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"], "Size class of this race."));
        fragment.appendChild(this.getTextareaSection("Size description", 'size_description', this.race.size_description, "Flavor description of height and weight for this race."));
        fragment.appendChild(this.getInputSection("Speed", 'speed', this.race.speed, true, "Base move speed for this race (in feet per round)."));

        this.traitsSection = new LinkedObjectsSection(
            "Traits",
            (await Trait.getAllAsync()).results,
            this.race.traits,
            "Racial traits that provide benefits to its members."
        );
        fragment.appendChild(this.traitsSection);

        this.languagesSection = new LinkedObjectsSection(
            "Languages",
            (await Language.getAllAsync()).results,
            this.race.languages,
            "Starting languages for all new characters of this race."
        );
        fragment.appendChild(this.languagesSection);

        this.languageOptionsSection = new ChoiceSection(
            "Language options",
            (await Language.getAllAsync()).results,
            this.race.language_options,
            "A choice of additional starting languages of this race"
        );
        fragment.appendChild(this.languageOptionsSection);

        fragment.appendChild(this.getTextareaSection("Language description", 'language_desc', this.race.language_desc, "Flavor description of the languages this race knows."));

        this.subracesSection = new LinkedObjectsSection(
            "Subraces",
            (await Subrace.getAllAsync()).results,
            this.race.subraces,
            "All possible subraces that this race includes."
        );
        fragment.appendChild(this.subracesSection);

        return fragment;
    }

    /**
     * @override Race specific properties.
     */
    getFormData() {

        const data = new Race(super.getFormData());

        data.ability_bonuses = this.abilityBonusesSection.getValue();
        data.traits = this.traitsSection.getValue();
        data.languages = this.languagesSection.getValue();
        data.language_options = this.languageOptionsSection.getValue();
        data.subraces = this.subracesSection.getValue();

        return data;
    }
}

customElements.define('race-form', RaceForm, { extends: 'form' });