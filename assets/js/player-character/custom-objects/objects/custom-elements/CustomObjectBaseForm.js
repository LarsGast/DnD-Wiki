import { globals } from "../../../load-globals.js";
import { ApiObjectInfo } from "../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";

export class CustomObjectBaseForm extends HTMLFormElement {

    /**
     *
     */
    constructor() {
        super();

        this.appendChild(this.getInput("Name", "name", globals.activeCustomObjectEntry.customObject.name, false));        
    }

    connectedCallback() {
        this.addEventListener("submit", this.handleSubmit.bind(this));

        this.appendChild(this.getSaveButton());
    }

    /**
     * 
     * @param {Event} event 
     */
    handleSubmit(event) {
        event.preventDefault();

        const data = this.getFormData();

        globals.activeCustomObjectEntry.customObject = data;
        globals.customObjectBank.save();

        window.location.reload();
    }

    /**
     * 
     * @returns {ApiObjectInfo}
     */
    getFormData() {
        const formData = new FormData(this);

        const data = new ApiObjectInfo();
        for (const [key, value] of formData) {
            data[key] = value;
        }

        return data;
    }

    getSaveButton() {
        const button = document.createElement('button');

        button.type = 'submit';
        button.textContent = 'Save';

        return button;
    }

    getInput(labelText, id, defaultValue, isNumberInput) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const input = document.createElement('input');
        input.id = `custom-object-${id}`;
        input.name = id;
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
        textArea.name = id;
        textArea.value = defaultValue ?? '';

        const fragment = document.createDocumentFragment();

        fragment.appendChild(label);
        fragment.appendChild(textArea);

        return fragment;
    }

    getSelect(labelText, id, defaultValue, options) {

        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const select = document.createElement('select');
        select.id = `custom-object-${id}`;
        select.name = id;

        select.appendChild(getEmptyOption());

        for (const option of options) {
            select.appendChild(getSelectOption(option));
        }

        select.value = defaultValue ?? null;

        const fragment = document.createDocumentFragment();

        fragment.appendChild(label);
        fragment.appendChild(select);

        return fragment;
    }
}

customElements.define('custom-object-base-form', CustomObjectBaseForm, { extends: 'form' });