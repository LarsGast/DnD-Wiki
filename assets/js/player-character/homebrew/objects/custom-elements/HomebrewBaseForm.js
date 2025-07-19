import { globals } from "../../../load-globals.js";
import { ApiObjectInfo } from "../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";

export class HomebrewBaseForm extends HTMLFormElement {

    /**
     *
     */
    constructor() {
        super();

        this.appendChild(this.getInputSection("Name", "name", globals.activeHomebrewEntry.homebrewObject.name, false));        
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

        globals.activeHomebrewEntry.homebrewObject = data;
        globals.homebrewBank.save();

        window.location.reload();
    }

    /**
     * 
     * @returns {ApiObjectInfo}
     */
    getFormData() {
        const formData = new FormData(this);

        const data = new ApiObjectInfo(globals.activeHomebrewEntry.homebrewObject);
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
        label.htmlFor = `homebrew-object-${id}`;

        const input = document.createElement('input');
        input.id = `homebrew-object-${id}`;
        input.name = id;
        input.value = defaultValue ?? '';
        input.type = isNumberInput ? 'number' : null;

        if (tooltip) {
            label.appendChild(HomebrewBaseForm.getTooltipSpan(tooltip));
        }

        label.appendChild(input);

        const section = document.createElement('section');
        section.appendChild(label);

        return section;
    }

    getTextareaSection(labelText, id, defaultValue, tooltip) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `homebrew-object-${id}`;

        const textArea = document.createElement('textarea');
        textArea.id = `homebrew-object-${id}`;
        textArea.name = id;
        textArea.value = defaultValue ?? '';

        if (tooltip) {
            label.appendChild(HomebrewBaseForm.getTooltipSpan(tooltip));
        }

        label.appendChild(textArea);

        const section = document.createElement('section');
        section.appendChild(label);

        return section;
    }

    getSelectSection(labelText, id, defaultValue, options, tooltip) {

        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `homebrew-object-${id}`;

        const select = document.createElement('select');
        select.id = `homebrew-object-${id}`;
        select.name = id;

        select.appendChild(getEmptyOption());

        for (const option of options) {
            select.appendChild(getSelectOption(option));
        }

        select.value = defaultValue ?? null;

        if (tooltip) {
            label.appendChild(HomebrewBaseForm.getTooltipSpan(tooltip));
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

customElements.define('homebrew-object-base-form', HomebrewBaseForm, { extends: 'form' });