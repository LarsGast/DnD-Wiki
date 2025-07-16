import { globals } from "../../../load-globals.js";
import { ApiObjectInfo } from "../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";

export class CustomObjectBaseForm extends HTMLFormElement {

    /**
     *
     */
    constructor() {
        super();

        this.appendChild(this.getInputSection("Name", "name", globals.activeCustomObjectEntry.customObject.name, false));        
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

        const data = new ApiObjectInfo(globals.activeCustomObjectEntry.customObject);
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

    getInputSection(labelText, id, defaultValue, isNumberInput, tooltip) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const input = document.createElement('input');
        input.id = `custom-object-${id}`;
        input.name = id;
        input.value = defaultValue ?? '';
        input.type = isNumberInput ? 'number' : null;

        if (tooltip) {
            label.appendChild(CustomObjectBaseForm.getTooltipSpan(tooltip));
        }

        label.appendChild(input);

        const section = document.createElement('section');
        section.appendChild(label);

        return section;
    }

    getTextareaSection(labelText, id, defaultValue, tooltip) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const textArea = document.createElement('textarea');
        textArea.id = `custom-object-${id}`;
        textArea.name = id;
        textArea.value = defaultValue ?? '';

        if (tooltip) {
            label.appendChild(CustomObjectBaseForm.getTooltipSpan(tooltip));
        }

        label.appendChild(textArea);

        const section = document.createElement('section');
        section.appendChild(label);

        return section;
    }

    getSelectSection(labelText, id, defaultValue, options, tooltip) {

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

        if (tooltip) {
            label.appendChild(CustomObjectBaseForm.getTooltipSpan(tooltip));
        }

        label.appendChild(select);

        const section = document.createElement('section');
        section.appendChild(label);

        return section;
    }

    static getTooltipSpan(tooltip) {
        const tooltipSpan = document.createElement('span');
        tooltipSpan.className = 'icon question';
        tooltipSpan.title = tooltip;

        return tooltipSpan;
    }
}

customElements.define('custom-object-base-form', CustomObjectBaseForm, { extends: 'form' });