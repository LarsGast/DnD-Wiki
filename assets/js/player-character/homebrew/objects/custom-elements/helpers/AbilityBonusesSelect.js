import { AbilityBonus } from "../../../../objects/api/helpers/AbilityBonus.js";
import { AbilityScore } from "../../../../objects/api/resources/AbilityScore.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, getSelectOption } from "../../../../util.js";

/**
 * Custom element for selecting ability bonuses.
 * It allows the user to select an ability score and input a bonus value.
 */
export class AbilityBonusesSelect extends HTMLElement {

    /**
     * Default order of ability scores.
     * @type {string[]}
     */
    abilityScoreOrder = ["str", "dex", "con", "int", "wis", "cha"];

    /**
     * Creates an instance of AbilityBonusesSelect.
     * @param {AbilityBonus} defaultAbilityBonus The default ability bonus to initialize the select and input fields.
     */
    constructor(defaultAbilityBonus) {
        super();
        
        /** @type {AbilityBonus} */
        this.defaultAbilityBonus = defaultAbilityBonus;
        
        this.select = this.getSelectElement();
        this.input = this.getBonusInputElement();
        this.deleteButton = this.getDeleteButton();

        this.appendChild(this.select);
        this.appendChild(this.input);
        this.appendChild(this.deleteButton);
    }

    /**
     * Lifecycle method called when the element is connected to the DOM.
     */
    async connectedCallback() {
        await this.fillSelectElement();
    }

    /**
     * Creates a select element for ability scores.
     * @returns {HTMLSelectElement} The select element with an empty option. This will be populated with ability scores later.
     */
    getSelectElement() {
        const select = document.createElement('select');

        select.appendChild(getEmptyOption());

        return select;
    }

    /**
     * Creates an input element for entering the bonus value.
     * @returns {HTMLInputElement} The input element for the bonus value.
     */
    getBonusInputElement() {
        const input = document.createElement('input');

        input.type = 'number';
        input.value = this.defaultAbilityBonus?.bonus;

        return input;
    }

    /**
     * Creates a delete button to remove the ability bonus select element.
     * @returns {HTMLButtonElement} The button element that, when clicked, will remove this element from the DOM.
     */
    getDeleteButton() {
        const button = document.createElement('button');

        button.textContent = "Remove";
        button.onclick = () => { this.remove() };

        return button;
    }

    /**
     * Fills the select element with ability scores.
     * It fetches all ability scores, sorts them according to the predefined order, and populates the select options.
     * @returns {Promise<void>} A promise that resolves when the select element is filled.
     */
    async fillSelectElement() {

        const abilityScores = (await AbilityScore.getAllAsync()).results;

        const sortedAbilityScores = abilityScores.sort((a, b) => {
            const posA = this.abilityScoreOrder.indexOf(a.index);
            const posB = this.abilityScoreOrder.indexOf(b.index);
            return posA - posB;
        });

        for (const abilityScore of sortedAbilityScores) {
            this.select.appendChild(getSelectOption(abilityScore.name, abilityScore.index));
        }

        this.select.value = this.defaultAbilityBonus?.ability_score.index ?? null;;
    }

    /**
     * Gets the value of the ability bonus select element.
     * @returns {AbilityBonus} The constructed AbilityBonus object containing the selected ability score and bonus value.
     */
    getValue() {
        const abilityBonus = new AbilityBonus();

        const abilityScore = new ApiObjectInfo();
        abilityScore.index = this.select.value;
        abilityScore.name = this.select.options[this.select.selectedIndex].text;

        abilityBonus.ability_score = abilityScore;
        abilityBonus.bonus = parseInt(this.input.value);

        return abilityBonus;
    }
}

customElements.define('ability-bonuses-select', AbilityBonusesSelect);