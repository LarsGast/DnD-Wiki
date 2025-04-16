import { getElementWithTextContent } from "../../../util.js";
import { Choice } from "../../api/helpers/Choice.js";
import { Feature } from "../../api/helpers/Feature.js";
import { Class } from "../../api/resources/Class.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom details element that displays the features of the selected class.
 * Extends HTMLDetailsElement.
 *
 * This element updates its display whenever the global PC's class information changes.
 * It shows sections for key class features, including hit die, proficiencies, starting equipment, and features available at each level.
 */
export class ClassFeaturesDisplay extends HTMLDetailsElement {

    constructor() {
        super();
        
        this.open = true;
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Immediately updates the display and starts listening for class changes.
     */
    connectedCallback() {
        // Update display immediately upon being added to the DOM.
        this.updateDisplay();

        // Save a reference to the event handler so it can be removed later.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("classesChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Cleans up the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("classesChanged", this._updateHandler);
    }

    /**
     * Asynchronously updates the class features display if an update is warranted.
     * @param {CustomEvent} event An optional event that triggers the update.
     */
    async updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            await this.updateClassFeaturesDisplay();
        }
    }

    /**
     * Determines if the display should be updated based on the triggering event.
     * @param {CustomEvent} event The event that triggered the update.
     * @returns {boolean} True if the display should update.
     */
    getShouldUpdate(event) {
        return !event || (event.type === "classesChanged");
    }

    /**
     * Asynchronously updates the display with the current class's features.
     * Hides the element if no class is selected.
     */
    async updateClassFeaturesDisplay() {
        // If no class information is present, hide this element.
        if (!globalPlayerCharacter.classes || globalPlayerCharacter.classes.length === 0) {
            this.style.display = "none";
            return;
        }
        
        this.style.display = "block";

        // Fetch the class data for the first (or primary) class.
        this.class = await Class.getAsync(globalPlayerCharacter.classes[0].index);

        // Also retrieve the character's level in that class.
        this.level = globalPlayerCharacter.classes[0].level;

        // Clear any existing content in the details element.
        this.replaceChildren();

        // Append the section heading (includes class name and level).
        this.appendChild(this.getSectionHeading());

        // Display the hit die information.
        this.appendChild(getElementWithTextContent("h3", "Hit Die"));
        this.appendChild(getElementWithTextContent("p", `d${this.class.hit_die}`));

        // Display the proficiencies section.
        this.appendChild(getElementWithTextContent("h3", "Proficiencies"));
        this.appendChild(this.getProficienciesSection());
        
        // Display starting equipment.
        this.appendChild(getElementWithTextContent("h3", "Starting Equipment"));
        this.appendChild(this.getStartingEquipmentSection());
        
        // Display level-specific features.
        this.appendChild(await this.getLevelsSection());
    }

    /**
     * Constructs and returns the section heading element.
     * The heading includes the class name and character level.
     * @returns {HTMLElement} A summary element containing an h2 heading.
     */
    getSectionHeading() {
        const summary = document.createElement('summary');
        summary.appendChild(getElementWithTextContent("h2", `Class features (${this.class.name} ${this.level})`));
        return summary;
    }

    /**
     * Creates and returns an unordered list element that displays the class proficiencies.
     * It includes both proficiency choices and fixed proficiencies.
     * @returns {HTMLUListElement} The list with proficiency items.
     */
    getProficienciesSection() {
        const ul = document.createElement('ul');

        // For each proficiency choice, add a list item with its description.
        for (const choiceObject of this.class.proficiency_choices) {
            ul.appendChild(getElementWithTextContent("li", choiceObject.desc));
        }

        // Then add each fixed proficiency.
        for (const obj of this.class.proficiencies) {
            ul.appendChild(getElementWithTextContent("li", obj.name));
        }

        return ul;
    }

    /**
     * Creates and returns an unordered list element that displays the starting equipment.
     * It lists both choices for equipment and fixed starting equipment.
     * @returns {HTMLUListElement} The list with starting equipment.
     */
    getStartingEquipmentSection() {
        const ul = document.createElement('ul');

        // List each equipment option description.
        for (const choiceObject of this.class.starting_equipment_options) {
            ul.appendChild(getElementWithTextContent("li", choiceObject.desc));
        }

        // List each fixed starting equipment with quantity.
        for (const startingEquipment of this.class.starting_equipment) {
            ul.appendChild(getElementWithTextContent("li", `${startingEquipment.quantity}x ${startingEquipment.equipment.name}`));
        }

        return ul;
    }

    /**
     * Creates and returns a fragment that includes level details from level 1 to the current level.
     * @returns {Promise<DocumentFragment>} A fragment with level features.
     */
    async getLevelsSection() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(getElementWithTextContent("h3", "Levels"));

        // For each level up to the current level, add its features.
        for (let levelNumber = 1; levelNumber <= this.level; levelNumber++) {
            fragment.appendChild(await this.getLevelSection(levelNumber));
        }

        return fragment;
    }

    /**
     * Asynchronously retrieves and constructs the display section for a given level.
     * @param {number} levelNumber The level number to create the section for.
     * @returns {Promise<DocumentFragment>} A fragment detailing features for that level.
     */
    async getLevelSection(levelNumber) {

        const fragment = document.createDocumentFragment();
        fragment.appendChild(getElementWithTextContent("h4", `Level ${levelNumber}`));
        
        // Fetch level-specific data for this class.
        const levelObject = await this.class.getLevelAsync(levelNumber);

        // For each feature at this level, add the feature section.
        for (const feature of await levelObject.getAllFeaturesAsync()) {
            fragment.appendChild(await this.getFeatureSection(feature));
        }

        return fragment;
    }

    /**
     * Asynchronously constructs and returns a fragment for a given feature.
     * The section includes the feature's name, description, and any subfeature options.
     * @param {Feature} feature The feature object.
     * @returns {Promise<DocumentFragment>} A fragment describing the feature.
     */
    async getFeatureSection(feature) {
        const fragment = document.createDocumentFragment();

        // Add feature name as a header.
        fragment.appendChild(getElementWithTextContent("h5", feature.name));

        // Add each paragraph in the feature description.
        for (const paragraph of feature.desc) {
            fragment.appendChild(getElementWithTextContent("p", paragraph));
        }

        // If there are feature-specific details (like subfeature options), add them.
        if (feature.feature_specific && feature.feature_specific.subfeature_options) {
            fragment.appendChild(await this.getChoiceSection(feature.feature_specific.subfeature_options));
        }

        return fragment;
    }

    /**
     * Asynchronously constructs a section for a choice.
     * It retrieves each subfeature from the choice options and displays its name and description.
     * @param {Choice} choice The choice object from feature_specific.
     * @returns {Promise<HTMLUListElement>} A ul containing the choice details.
     */
    async getChoiceSection(choice) {
        const ul = document.createElement("ul");

        // For each option provided by the choice, fetch the subfeature and display it.
        for (const option of choice.from.options) {
            const subfeature = await Feature.getAsync(option.item.index);
            
            const li = getElementWithTextContent("li", `${subfeature.name}. `);
            
            for (const paragraph of subfeature.desc) {
                li.textContent += paragraph;
            }

            ul.appendChild(li);
        }

        return ul;
    }
}

customElements.define('class-features-display', ClassFeaturesDisplay, { extends: 'details' });