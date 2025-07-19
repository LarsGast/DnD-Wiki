import { AbilityBonus } from "../../../../objects/api/helpers/AbilityBonus.js";
import { Race } from "../../../../objects/api/resources/Race.js";
import { HomebrewBaseForm } from "../HomebrewBaseForm.js";
import { AbilityBonusesSelect } from "./AbilityBonusesSelect.js";

export class AbilityBonusesSection extends HTMLElement {

    /**
     * 
     * @param {AbilityBonus[]} abilityBonuses 
     */
    constructor(abilityBonuses, tooltip) {
        super();

        this.appendChild(this.getSectionLabel(tooltip));
        this.appendChild(this.getAddAbilityBonusButton());

        for (const abilityBonus of abilityBonuses) {
            this.addAbilityBonusSelect(abilityBonus);
        }
    }

    getSectionLabel(tooltip) {
        const label = document.createElement('label');

        label.textContent = "Ability bonuses";

        label.appendChild(HomebrewBaseForm.getTooltipSpan(tooltip));

        return label;
    }

    getAddAbilityBonusButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addAbilityBonusSelect() };

        return button;
    }

    addAbilityBonusSelect(defaultAbilityScore) {
        this.appendChild(new AbilityBonusesSelect(defaultAbilityScore));
    }

    /**
     * 
     * @type {AbilityBonus[]}
     */
    getValue() {
        /** @type {AbilityBonusesSelect[]} */
        const abilityBonusSelects = Array.from(this.querySelectorAll('ability-bonuses-select'));

        return abilityBonusSelects.map(select => select.getValue());
    }
}

customElements.define('ability-bonuses-section', AbilityBonusesSection);