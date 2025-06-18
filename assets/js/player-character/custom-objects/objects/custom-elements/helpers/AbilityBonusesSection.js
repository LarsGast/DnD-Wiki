import { Race } from "../../../../objects/api/resources/Race.js";
import { AbilityBonusesSelect } from "./AbilityBonusesSelect.js";

export class AbilityBonusesSection extends HTMLElement {

    /**
     *
     */
    constructor(race) {
        super();

        /** @type {Race} */
        this.race = race;

        this.appendChild(this.getSectionLabel());
        this.appendChild(this.getAddAbilityBonusButton());

        for (const abilityBonus of this.race.ability_bonuses) {
            this.addAbilityBonusSelect(abilityBonus.ability_score.index, abilityBonus.bonus);
        }
    }

    getSectionLabel() {
        const label = document.createElement('label');

        label.textContent = "Ability bonuses";

        return label;
    }

    getAddAbilityBonusButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addAbilityBonusSelect() };

        return button;
    }

    addAbilityBonusSelect(defaultAbilityScore, defaultBonus) {
        this.appendChild(new AbilityBonusesSelect(defaultAbilityScore, defaultBonus));
    }
}

customElements.define('ability-bonuses-section', AbilityBonusesSection);