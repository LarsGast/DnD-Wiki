import { Armor } from "../../api/resources/equipment/Armor.js";
import { ArmorProficiencyCheckbox } from "./ArmorProficiencyCheckbox.js";

export class ArmorProficiencyDisplay extends HTMLLIElement {

    /**
     * 
     * @param {Armor} armor 
     */
    constructor(armor) {
        super();

        this.armor = armor;

        this.proficiencyCheckbox = new ArmorProficiencyCheckbox(this.armor);
        
        this.armorProficiencyLabel = document.createElement('label');
        this.armorProficiencyLabel.appendChild(this.proficiencyCheckbox);
        this.armorProficiencyLabel.appendChild(document.createTextNode(this.armor.name));

        this.appendChild(this.armorProficiencyLabel);
    }
}

customElements.define('armor-proficiency-display', ArmorProficiencyDisplay, { extends: 'li' });