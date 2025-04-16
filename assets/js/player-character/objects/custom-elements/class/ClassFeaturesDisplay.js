import { Choice } from "../../api/helpers/Choice.js";
import { Feature } from "../../api/helpers/Feature.js";
import { Class } from "../../api/resources/Class.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

/**
 * Custom details element that displays the features of the selected class.
 * Extends HTMLDetailsElement.
 *
 * This element updates its display whenever the global PC's class changes.
 * It shows sections for ability bonuses, speed, alignment, age, size, languages, and any available traits.
 */
export class ClassFeaturesDisplay extends HTMLDetailsElement {

    constructor() {
        super();

        this.open = true;
    }
    
    /**
     * Called when the element is connected to the DOM.
     * Immediately updates the display and starts listening for class updates.
     */
    connectedCallback() {

        // Update the display on startup.
        this.updateDisplay();

        // Save a handler to update the display when the class is updated.
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
     * Asynchronously updates the display if an update is warranted.
     * @param {CustomEvent} event An optional event that triggers the update.
     */
    async updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            await this.updateClassFeaturesDisplay();
        }
    }

    /**
     * Determines if the display should be updated.
     * @param {CustomEvent} event The event that triggered the update.
     * @returns {boolean} True if update should occur.
     */
    getShouldUpdate(event) {
        return !event || (event.type === "classesChanged");
    }

    /**
     * Creates and returns a level-3 heading element for a given title.
     * @param {string} title The heading title.
     * @returns {HTMLElement} The heading element.
     */
    getHeading(title) {
        const heading = document.createElement('h3');
        heading.textContent = title;
        return heading;
    }

    /**
     * Creates and returns a paragraph element containing the body text.
     * @param {string} body The text content.
     * @returns {HTMLElement} The paragraph element.
     */
    getParagraph(body) {
        const p = document.createElement('p');
        p.textContent = body;
        return p;
    }

    /**
     * Asynchronously updates the display with the class's features.
     * Hides the element if no class is selected.
     */
    async updateClassFeaturesDisplay() {

        // No class selected - hide the element.
        if (!globalPlayerCharacter.classes || globalPlayerCharacter.classes.length === 0) {
            this.style.display = "none";
            return;
        }
        
        this.style.display = "block";
        this.class = await Class.getAsync(globalPlayerCharacter.classes[0].index);
        this.level = globalPlayerCharacter.classes[0].level;

        // Clear any existing content.
        this.replaceChildren();

        // Create section heading with class name.
        this.appendChild(this.getSectionHeading());

        // Display ability bonuses.
        this.appendChild(this.getHeading("Hit Die"));
        this.appendChild(this.getParagraph(`d${this.class.hit_die}`));

        // Display speed.
        this.appendChild(this.getHeading("Proficiencies"));
        this.appendChild(this.getProficienciesSection());
        
        // Display alignment.
        this.appendChild(this.getHeading("Starting Equipment"));
        this.appendChild(this.getStartingEquipmentSection());
        
        // Display age.
        this.appendChild(await this.getLevelsSection());
    }

    getProficienciesSection() {
        const ul = document.createElement('ul');

        for (const choiceObject of this.class.proficiency_choices) {
            ul.appendChild(this.getListItem(choiceObject.desc));
        }

        for (const obj of this.class.proficiencies) {
            ul.appendChild(this.getListItem(obj.name));
        }

        return ul;
    }

    getStartingEquipmentSection() {
        const ul = document.createElement('ul');

        for (const choiceObject of this.class.starting_equipment_options) {
            ul.appendChild(this.getListItem(choiceObject.desc));
        }

        for (const startingEquipment of this.class.starting_equipment) {
            ul.appendChild(this.getListItem(`${startingEquipment.quantity}x ${startingEquipment.equipment.name}`));
        }

        return ul;
    }

    async getLevelsSection() {
        const section = document.createElement('section');

        section.appendChild(this.getHeading("Levels"));

        for (let levelNumber = 1; levelNumber <= this.level; levelNumber++) {
            section.appendChild(await this.getLevelSection(levelNumber));
        }

        return section;
    }

    async getLevelSection(levelNumber) {
        const levelObject = await this.class.getLevelAsync(levelNumber);

        const section = document.createElement('section');

        section.appendChild(this.getHeading4(`Level ${levelNumber}`));

        for (const feature of await levelObject.getAllFeaturesAsync()) {
            section.appendChild(await this.getFeatureSection(feature));
        }

        return section;
    }

    /**
     * 
     * @param {Feature} feature 
     */
    async getFeatureSection(feature) {

        const section = document.createElement('section');

        section.appendChild(this.getHeading5(feature.name));

        for (const paragraph of feature.desc) {
            section.appendChild(this.getParagraph(paragraph));
        }

        if (feature.feature_specific) {
            if (feature.feature_specific.subfeature_options) {
                section.appendChild(await this.getChoiceSection(feature.feature_specific.subfeature_options));
            }
        }

        return section;
    }

    /**
     * 
     * @param {Choice} choice 
     */
    async getChoiceSection(choice) {
        const div = document.createElement('div');

        for (const option of choice.from.options) {
            const subfeature = await Feature.getAsync(option.item.index);
            div.appendChild(this.getHeading6(subfeature.name));
            
            for (const paragraph of subfeature.desc) {
                div.appendChild(this.getParagraph(paragraph));
            }
        }

        return div;
    }

    getListItem(context) {
        const li = document.createElement('li');

        li.textContent = context;

        return li;
    }

    /**
     * Constructs and returns the section heading element.
     * @returns {HTMLElement} The summary element with an h2 heading.
     */
    getSectionHeading() {
        const summary = document.createElement('summary');

        const heading = document.createElement('h2');

        heading.textContent = `Class features (${this.getClassName()} ${this.level})`;

        summary.appendChild(heading);

        return summary;
    }

    /**
     * Retrieves the class name.
     * @returns {string} The class name or a fallback prompt.
     */
    getClassName() {
        return this.class ? this.class.name : "choose class";
    }

    /**
     * Creates and returns a level-5 heading element for a trait.
     * @param {string} title The trait title.
     * @returns {HTMLElement} The heading element.
     */
    getHeading5(title) {
        const heading = document.createElement('h5');
        heading.textContent = title;
        return heading;
    }

    /**
     * Creates and returns a level-5 heading element for a trait.
     * @param {string} title The trait title.
     * @returns {HTMLElement} The heading element.
     */
    getHeading6(title) {
        const heading = document.createElement('h6');
        heading.textContent = title;
        return heading;
    }

    /**
     * Creates and returns a level-4 heading element for a trait.
     * @param {string} title The trait title.
     * @returns {HTMLElement} The heading element.
     */
    getHeading4(title) {
        const heading = document.createElement('h4');
        heading.textContent = title;
        return heading;
    }

    /**
     * Constructs a section element for class traits.
     * @param {Array} traits An array of trait objects.
     * @returns {HTMLElement} The section element containing trait headings and descriptions.
     */
    getTraitsSection(traits) {
        const traitsSection = document.createElement('section');
        
        traitsSection.appendChild(this.getHeading("Traits"));

        for (const trait of traits) {
            traitsSection.appendChild(this.getHeading4(trait.name));
            for (const traitDesc of trait.desc) {
                traitsSection.appendChild(this.getParagraph(traitDesc));
            }
        }

        return traitsSection;
    }
}

customElements.define('class-features-display', ClassFeaturesDisplay, { extends: 'details' });