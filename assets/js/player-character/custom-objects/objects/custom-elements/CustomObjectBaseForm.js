import { globals } from "../../../load-globals.js";

export class CustomObjectBaseForm extends HTMLFormElement {

    /**
     *
     */
    constructor() {
        super();

        this.appendChild(this.getInput("Name", "name", globals.activeCustomObjectEntry.customObject.name, false));        
    }

    getInput(labelText, id, defaultValue, isNumberInput) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const input = document.createElement('input');
        input.id = `custom-object-${id}`;
        input.value = defaultValue ?? '';
        input.type = isNumberInput ? 'number' : null;

        const fragment = document.createDocumentFragment();

        fragment.appendChild(label);
        fragment.appendChild(input);

        return fragment;
    }

    getTextarea(labelText, id, defaultValue) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const textArea = document.createElement('textarea');
        textArea.id = `custom-object-${id}`;
        textArea.value = defaultValue ?? '';

        const fragment = document.createDocumentFragment();

        fragment.appendChild(label);
        fragment.appendChild(textArea);

        return fragment;
    }
}

customElements.define('custom-object-base-form', CustomObjectBaseForm, { extends: 'form' });