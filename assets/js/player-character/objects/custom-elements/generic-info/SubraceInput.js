import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";
import { Race } from "../../api/resources/Race.js";

export class SubraceInput extends HTMLSelectElement {
    
    constructor() {
        super();

        this.onchange = () => this.handleChange();
    }

    async connectedCallback() {
        // Update immediately.
        await this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = () => this.updateDisplay();
        document.addEventListener("raceUpdated", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("raceUpdated", this._updateHandler);
    }

    async updateDisplay() {
        const race = await Race.getAsync(globalPlayerCharacter.race);

        this.replaceChildren();

        this.appendChild(getEmptyOption());

        if (race.subraces) {
            for (const subrace of race.subraces) {
                this.appendChild(getSelectOption(subrace.name, subrace.index));
            }
        }

        this.value = globalPlayerCharacter.subrace;
    }

    handleChange() {

        globalPlayerCharacter.setProperty('subrace', this.value);

        document.dispatchEvent(new Event("subraceUpdated"));
    }
}

customElements.define('subrace-input', SubraceInput, { extends: 'select' });