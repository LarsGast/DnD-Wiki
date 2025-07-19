import { globals } from "../../../load-globals.js";
import { ApiObjectInfo } from "../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";

/**
 * Base class for homebrew object forms.
 * This class provides common functionality for homebrew object forms, such as handling form submission and saving data.
 * Inherit from this class to create specific homebrew object forms.
 */
export class HomebrewBaseForm extends HTMLFormElement {
    
    constructor() {
        super();

        // "Name" is the only required field for all homebrew objects.
        this.appendChild(this.getInputSection("Name", "name", globals.activeHomebrewEntry.homebrewObject.name, false));        
    }

    /**
     * Called when the form is connected to the DOM.
     */
    connectedCallback() {
        this.addEventListener("submit", this.handleSubmit.bind(this));

        // Add the save button on the bottom of the form.
        this.appendChild(this.getSaveButton());
    }

    /**
     * Handles the form submission.
     * Prevents the default form submission behavior, collects the form data, updates the active homebrew entry, saves the homebrew bank, and reloads the page.
     * Override this method in subclasses to add additional functionality.
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
     * Collects the form data and returns it as an ApiObjectInfo instance.
     * Override this method in subclasses to add additional fields.
     * @returns {ApiObjectInfo} Homebrew object data collected from the form.
     */
    getFormData() {
        const formData = new FormData(this);

        // Initialize a new ApiObjectInfo instance with the current homebrew object to keep the UUID the same.
        const data = new ApiObjectInfo(globals.activeHomebrewEntry.homebrewObject);

        // Overwrite the properties of the ApiObjectInfo instance with the form data.
        for (const [key, value] of formData) {
            data[key] = value;
        }

        return data;
    }

    /**
     * Creates and returns a save button element.
     * @returns {HTMLButtonElement} Save button element.
     */
    getSaveButton() {
        const button = document.createElement('button');

        button.type = 'submit';
        button.textContent = 'Save';

        return button;
    }

    /**
     * Creates and returns a labeled input section for the form.
     * @param {string} labelText Text for the label of the input.
     * @param {string} id ID and name for the input element.
     * @param {string} defaultValue Default value for the input.
     * @param {boolean} isNumberInput Whether the input should be a number input.
     * @param {string} tooltip Optional tooltip text for the input. If provided, a tooltip icon will be added to the label.
     * @returns {HTMLElement} Section containing the label and input element.
     */
    getInputSection(labelText, id, defaultValue, isNumberInput, tooltip = null) {

        // Label.
        const label = HomebrewBaseForm.getLabel(labelText, id);

        // Input.
        const input = document.createElement('input');
        input.id = `homebrew-object-${id}`;
        input.name = id;
        input.value = defaultValue ?? '';
        input.type = isNumberInput ? 'number' : null;

        label.appendChild(input);

        // Tooltip.
        if (tooltip) {
            label.appendChild(HomebrewBaseForm.getTooltipSpan(tooltip));
        }
        
        return HomebrewBaseForm.getSection(label);
    }

    /**
     * Creates and returns a labeled textarea section for the form.
     * @param {string} labelText Text for the label of the textarea.
     * @param {string} id ID and name for the textarea element.
     * @param {string} defaultValue Default value for the textarea.
     * @param {string} tooltip Optional tooltip text for the textarea. If provided, a tooltip icon will be added to the label.
     * @returns {HTMLElement} Section containing the label and textarea element.
     */
    getTextareaSection(labelText, id, defaultValue, tooltip) {
        
        // Label.
        const label = HomebrewBaseForm.getLabel(labelText, id);

        // Textarea.
        const textArea = document.createElement('textarea');
        textArea.id = `homebrew-object-${id}`;
        textArea.name = id;
        textArea.value = defaultValue ?? '';

        label.appendChild(textArea);

        // Tooltip.
        if (tooltip) {
            label.appendChild(HomebrewBaseForm.getTooltipSpan(tooltip));
        }

        return HomebrewBaseForm.getSection(label);
    }

    /**
     * Creates and returns a labeled select section for the form.
     * @param {string} labelText Text for the label of the select element.
     * @param {string} id ID and name for the select element.
     * @param {string} defaultValue Default value for the select element.
     * @param {string[]} options Array of options for the select element. No support for objects, only strings.
     * @param {string} tooltip Optional tooltip text for the select element. If provided, a tooltip icon will be added to the label.
     * @returns {HTMLElement} Section containing the label and select element.
     */
    getSelectSection(labelText, id, defaultValue, options, tooltip) {

        // Label.
        const label = HomebrewBaseForm.getLabel(labelText, id);

        // Select.
        const select = document.createElement('select');
        select.id = `homebrew-object-${id}`;
        select.name = id;

        select.appendChild(getEmptyOption());

        for (const option of options) {
            select.appendChild(getSelectOption(option));
        }

        select.value = defaultValue ?? null;

        label.appendChild(select);

        // Tooltip.
        if (tooltip) {
            label.appendChild(HomebrewBaseForm.getTooltipSpan(tooltip));
        }

        return HomebrewBaseForm.getSection(label);
    }

    /**
     * Creates a label element with the given text and ID.
     * @param {string} labelText Text for the label.
     * @param {string} id ID for the label and associated input element.
     * @returns {HTMLLabelElement} Label element.
     */
    static getLabel(labelText, id) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `homebrew-object-${id}`;

        return label;
    }

    /**
     * Creates a tooltip span element with the given tooltip text.
     * @param {string} tooltip Tooltip text to be displayed in the tooltip.
     * @returns {HTMLSpanElement} Tooltip span element.
     */
    static getTooltipSpan(tooltip) {
        const tooltipSpan = document.createElement('span');
        tooltipSpan.className = 'icon question';
        tooltipSpan.title = tooltip;

        return tooltipSpan;
    }

    /**
     * Creates a section element containing the given label.
     * @param {HTMLLabelElement} label Label element to be included in the section.
     * @returns {HTMLElement} Section element containing the label.
     */
    static getSection(label) {

        const section = document.createElement('section');
        section.appendChild(label);

        return section;
    }
}

customElements.define('homebrew-object-base-form', HomebrewBaseForm, { extends: 'form' });