import { globals } from "../../../load-globals.js";
import { ApiObjectInfo } from "../../../objects/api/resources/ApiObjectInfo.js";
import { getInputSection } from './FormElementsBuilder.js'

/**
 * Base class for homebrew object forms.
 * This class provides common functionality for homebrew object forms, such as handling form submission and saving data.
 * Inherit from this class to create specific homebrew object forms.
 */
export class HomebrewBaseForm extends HTMLFormElement {
    
    /**
     * Creates an instance of HomebrewBaseForm.
     * @param {ApiObjectInfo} homebrewObject 
     */
    constructor(homebrewObject) {
        super();

        // "Name" is the only required field for all homebrew objects.
        this.appendChild(getInputSection("Name", "name", homebrewObject.name, false, "Name of the homebrew object.", true));    
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
}

customElements.define('homebrew-object-base-form', HomebrewBaseForm, { extends: 'form' });