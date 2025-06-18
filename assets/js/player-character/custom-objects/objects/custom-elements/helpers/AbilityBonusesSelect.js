import { AbilityScore } from "../../../../objects/api/resources/AbilityScore.js";
import { getEmptyOption, getSelectOption } from "../../../../util.js";

export class AbilityBonusesSelect extends HTMLElement {

    /**
     *
     */
    constructor(defaultAbilityScore, defaultBonus) {
        super();
        
        this.defaultAbilityScore = defaultAbilityScore;
        this.select = this.getSelectElement();
        this.input = this.getInputElement(defaultBonus);
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

    getInputElement(defaultValue) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = defaultValue;

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

        for (const abilityScore of abilityScores) {
            this.select.appendChild(getSelectOption(abilityScore.name, abilityScore.index));
        }

        this.select.value = this.defaultAbilityScore;
    }
}

customElements.define('ability-bonuses-select', AbilityBonusesSelect);