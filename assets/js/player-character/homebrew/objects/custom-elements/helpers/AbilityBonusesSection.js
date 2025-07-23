import { AbilityBonus } from "../../../../objects/api/helpers/AbilityBonus.js";
import { HomebrewBaseForm } from "../HomebrewBaseForm.js";
import { AbilityBonusesSelect } from "./AbilityBonusesSelect.js";

/**
 * Custom section element for displaying and editing ability bonuses.
 * This element allows users to add, remove, and modify ability bonuses for homebrew objects.
 */
export class AbilityBonusesSection extends HTMLElement {

    /**
     * Creates an instance of AbilityBonusesSection.
     * @param {AbilityBonus[]} abilityBonuses Initial ability bonuses to display.
     * @param {string} tooltip Tooltip text for the section.
     */
    constructor(abilityBonuses, tooltip) {
        super();

        this.appendChild(this.getSectionLabel(tooltip));
        this.appendChild(this.getAddAbilityBonusButton());

        for (const abilityBonus of abilityBonuses) {
            this.addAbilityBonusSelect(abilityBonus);
        }
    }

    /**
     * Creates and returns the section label with tooltip.
     * @param {string} tooltip Tooltip text for the section.
     * @returns {HTMLLabelElement} Label element for the section.
     */
    getSectionLabel(tooltip) {
        const label = document.createElement('label');

        label.textContent = "Ability bonuses";

        label.appendChild(HomebrewBaseForm.getTooltipSpan(tooltip));

        return label;
    }

    /**
     * Creates and returns a button to add new ability bonus selects.
     * @returns {HTMLButtonElement} Button element to add new ability bonus selects.
     */
    getAddAbilityBonusButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addAbilityBonusSelect() };

        return button;
    }

    /**
     * Adds a new AbilityBonusesSelect element to the section.
     * @param {AbilityBonus} defaultAbilityScore Optional initial ability bonus to set the select value.
     */
    addAbilityBonusSelect(defaultAbilityScore) {
        this.appendChild(new AbilityBonusesSelect(defaultAbilityScore));
    }

    /**
     * Retrieves the values of all ability bonuses from the section.
     * @returns {AbilityBonus[]} Array of AbilityBonus objects representing the selected values.
     */
    getValue() {
        /** @type {AbilityBonusesSelect[]} */
        const abilityBonusSelects = Array.from(this.querySelectorAll('ability-bonuses-select'));

        return abilityBonusSelects.map(select => select.getValue());
    }
}

customElements.define('ability-bonuses-section', AbilityBonusesSection);