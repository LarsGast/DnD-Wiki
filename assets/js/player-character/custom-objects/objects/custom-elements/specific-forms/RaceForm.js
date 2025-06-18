import { Race } from "../../../../objects/api/resources/Race.js";
import { CustomObjectBaseForm } from "../CustomObjectBaseForm.js";
import { AbilityBonusesSection } from "../helpers/AbilityBonusesSection.js";

export class RaceForm extends CustomObjectBaseForm {
    /**
     *
     */
    constructor(raceElement) {
        super();
        
        /** @type {Race} */
        this.race = raceElement;

        this.appendChild(this.getFormBody());
    }

    getFormBody() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(this.getInput("Speed", 'speed', this.race.speed, true));
        fragment.appendChild(new AbilityBonusesSection(this.race));
        fragment.appendChild(this.getTextarea("Age", 'age', this.race.age));
        fragment.appendChild(this.getTextarea("Alignment", 'alignment', this.race.alignment));
        fragment.appendChild(this.getInput("Size", 'size', this.race.size, false));
        fragment.appendChild(this.getTextarea("Size description", 'size-description', this.race.size_description));
        fragment.appendChild(this.getTextarea("Language description", 'language-description', this.race.language_desc));

        return fragment;
    }
}

customElements.define('race-form', RaceForm, { extends: 'form' });