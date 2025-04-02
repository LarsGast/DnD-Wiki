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
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("raceUpdated", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("raceUpdated", this._updateHandler);
    }

    /**
     * 
     * @param {Event} event 
     */
    async updateDisplay(event) {

        this.replaceChildren();

        this.appendChild(getEmptyOption());

        if (globalPlayerCharacter.race) {
            const race = await Race.getAsync(globalPlayerCharacter.race);
            for (const subrace of race.subraces) {
                this.appendChild(getSelectOption(subrace.name, subrace.index));
            }
        }

        if (event) {
            this.handleChange();
        }
        else {
            this.value = globalPlayerCharacter.subrace;
        }
    }

    handleChange() {

        globalPlayerCharacter.setProperty('subrace', this.value == "null" ? null : this.value);

        document.dispatchEvent(new Event("subraceUpdated"));
    }
}

customElements.define('subrace-input', SubraceInput, { extends: 'select' });