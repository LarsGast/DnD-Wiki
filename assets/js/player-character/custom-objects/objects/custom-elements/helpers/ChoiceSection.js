import { Choice } from "../../../../objects/api/helpers/Choice.js";
import { ChoiceOptionElement } from "./ChoiceOptionElement.js";

export class ChoiceSection extends HTMLElement {
    /**
     *
     */
    constructor(sectionLabel, choiceObject) {
        super();

        /** @type {Choice} */
        this.choiceObject = choiceObject;

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

        for (const option of this.choiceObject.from.options) {
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

        textarea.value = this.choiceObject.desc;

        return textarea;
    }

    getChooseInput() {
        const input = document.createElement('input');

        input.type = 'number';
        input.value = this.choiceObject.choose;

        return input;
    }

    getTypeInput() {
        const input = document.createElement('input');

        input.value = this.choiceObject.type;

        return input;
    }

    getAddOptionButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addOption() };

        return button;
    }

    addOption(defaultValue) {
        this.appendChild(new ChoiceOptionElement(defaultValue));
    }
}

customElements.define('choice-section', ChoiceSection);