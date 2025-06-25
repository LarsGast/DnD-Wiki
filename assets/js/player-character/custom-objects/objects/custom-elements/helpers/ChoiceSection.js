import { Choice, OptionSet } from "../../../../objects/api/helpers/Choice.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { ChoiceOptionElement } from "./ChoiceOptionElement.js";

export class ChoiceSection extends HTMLElement {
    /**
     *
     */
    constructor(sectionLabel, defaultValue) {
        super();

        /** @type {Choice} */
        this.defaultValue = defaultValue;

        this.descTextarea = this.getDescTextarea();
        this.chooseInput = this.getChooseInput();
        this.typeInput = this.getTypeInput();
        
        this.appendChild(this.getLabel(sectionLabel));
        this.appendChild(this.getLabel("Description"));
        this.appendChild(this.descTextarea);
        this.appendChild(this.getLabel("Choose"));
        this.appendChild(this.chooseInput);
        this.appendChild(this.getLabel("Type"));
        this.appendChild(this.typeInput);
        this.appendChild(this.getLabel("Options"));
        this.appendChild(this.getAddOptionButton());

        for (const option of this.defaultValue.from.options) {
            this.addOption(option.item);
        }
    }

    getLabel(labelText) {
        const label = document.createElement('label');

        label.textContent = labelText;

        return label;
    }

    getDescTextarea() {
        const textarea = document.createElement('textarea');

        textarea.value = this.defaultValue.desc;

        return textarea;
    }

    getChooseInput() {
        const input = document.createElement('input');

        input.type = 'number';
        input.value = this.defaultValue.choose;

        return input;
    }

    getTypeInput() {
        const input = document.createElement('input');

        input.value = this.defaultValue.type;

        return input;
    }

    getAddOptionButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addOption() };

        return button;
    }

    /**
     * 
     * @param {ApiObjectInfo} defaultValue 
     */
    addOption(defaultValue) {
        this.appendChild(new ChoiceOptionElement(defaultValue));
    }

    /**
     * 
     * @returns {Choice}
     */
    getValue() {

        const choice = new Choice();

        choice.desc = this.descTextarea.value;
        choice.choose = parseInt(this.chooseInput.value) || 0;
        choice.type = this.typeInput.value;

        const optionSet = new OptionSet();
        optionSet.option_set_type = "options_array";

        /** @type {ChoiceOptionElement[]} */
        const options = Array.from(this.querySelectorAll('choice-option-element'));
        optionSet.options = options.map(option => option.getValue());

        choice.from = optionSet;

        return choice;
    }
}

customElements.define('choice-section', ChoiceSection);