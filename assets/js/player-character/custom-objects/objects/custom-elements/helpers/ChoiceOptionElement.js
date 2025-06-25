import { Choice, Option } from "../../../../objects/api/helpers/Choice.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { Proficiency } from "../../../../objects/api/resources/Proficiency.js";
import { getEmptyOption, getSelectOption } from "../../../../util.js";

export class ChoiceOptionElement extends HTMLElement {
    
    /**
     * 
     * @param {ApiObjectInfo} defaultValue 
     */
    constructor(defaultValue) {
        super();
        
        /** @type {ApiObjectInfo} */
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

        this.select.value = this.defaultValue?.index ?? null;
    }

    /**
     * 
     * @returns {Option}
     */
    getValue() {
        const option = new Option();

        option.option_type = "reference";

        const item = new ApiObjectInfo();
        item.index = this.select.value;
        item.name = this.select.options[this.select.selectedIndex].text;

        option.item = item;

        return option;
    }
}

customElements.define('choice-option-element', ChoiceOptionElement);