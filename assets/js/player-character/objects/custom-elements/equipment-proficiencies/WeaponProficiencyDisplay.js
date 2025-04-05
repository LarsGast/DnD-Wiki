import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { WeaponProficiencyCheckbox } from "./WeaponProficiencyCheckbox.js";

export class WeaponProficiencyDisplay extends HTMLLIElement {

    /**
     * 
     * @param {Weapon} weapon 
     */
    constructor(weapon) {
        super();

        this.weapon = weapon;

        this.proficiencyCheckbox = new WeaponProficiencyCheckbox(this.weapon);

        this.weaponProficiencyLabel = document.createElement('label');
        this.weaponProficiencyLabel.appendChild(this.proficiencyCheckbox);
        this.weaponProficiencyLabel.appendChild(document.createTextNode(this.weapon.name));

        this.appendChild(this.weaponProficiencyLabel);
    }
}

customElements.define('weapon-proficiency-display', WeaponProficiencyDisplay, { extends: 'li' });