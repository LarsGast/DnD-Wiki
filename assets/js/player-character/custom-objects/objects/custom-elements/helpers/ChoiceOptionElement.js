import { Proficiency } from "../../../../objects/api/resources/Proficiency.js";
import { getEmptyOption, getSelectOption } from "../../../../util.js";

export class ChoiceOptionElement extends HTMLElement {
    /**
     *
     */
    constructor(defaultValue) {
        super();
        
        this.defaultValue = defaultValue;
        this.select = this.getItemSelect();

        this.appendChild(this.select);
        this.appendChild(this.getDeleteButton());
    }

    async connectedCallback() {
        await this.fillSelect();
    }

    getItemSelect() {
        const select = document.createElement('select');

        select.appendChild(getEmptyOption());

        return select;
    }

    getDeleteButton() {
        const button = document.createElement('button');

        button.textContent = "Remove";
        button.onclick = () => { this.remove() };

        return button;
    }

    async fillSelect() {
        const proficiencies = (await Proficiency.getAllAsync()).results;

        for (const proficiency of proficiencies) {
            this.select.appendChild(getSelectOption(proficiency.name, proficiency.index));
        }

        this.select.value = this.defaultValue ?? null;
    }
}

customElements.define('choice-option-element', ChoiceOptionElement);