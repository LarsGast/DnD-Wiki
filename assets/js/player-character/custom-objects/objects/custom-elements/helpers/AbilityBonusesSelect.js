import { AbilityBonus } from "../../../../objects/api/helpers/AbilityBonus.js";
import { AbilityScore } from "../../../../objects/api/resources/AbilityScore.js";
import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, getSelectOption } from "../../../../util.js";

export class AbilityBonusesSelect extends HTMLElement {

    /**
     * Default order of ability scores.
     * @type {string[]}
     */
    abilityScoreOrder = ["str", "dex", "con", "int", "wis", "cha"];

    /**
     *
     */
    constructor(defaultAbilityBonus) {
        super();
        
        /** @type {AbilityBonus} */
        this.defaultAbilityBonus = defaultAbilityBonus;
        
        this.select = this.getSelectElement();
        this.input = this.getInputElement();
        this.deleteButton = this.getDeleteButton();

        this.appendChild(this.select);
        this.appendChild(this.input);
        this.appendChild(this.deleteButton);
    }

    async connectedCallback() {
        await this.fillSelectElement();
    }

    getSelectElement() {
        const select = document.createElement('select');

        select.appendChild(getEmptyOption());

        return select;
    }

    getInputElement() {
        const input = document.createElement('input');

        input.type = 'number';
        input.value = this.defaultAbilityBonus?.bonus;

        return input;
    }

    getDeleteButton() {
        const button = document.createElement('button');

        button.textContent = "Remove";
        button.onclick = () => { this.remove() };

        return button;
    }

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
     * 
     * @type {AbilityBonus}
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