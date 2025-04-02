import { Race } from "../../api/resources/Race.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class RaceInput extends HTMLSelectElement {
    
    constructor() {
        super();

        this.onchange = () => this.handleChange();
    }

    async connectedCallback() {
        const allRaces = await Race.getAllAsync();

        this.appendChild(getEmptyOption());

        for (const race of allRaces.results) {
            this.appendChild(getSelectOption(race.name, race.index));
        }

        this.value = globalPlayerCharacter.race;
    }

    handleChange() {

        globalPlayerCharacter.setProperty('race', this.value);
        globalPlayerCharacter.setProperty('subrace', null);

        document.dispatchEvent(new Event("raceUpdated"));
    }
}

customElements.define('race-input', RaceInput, { extends: 'select' });