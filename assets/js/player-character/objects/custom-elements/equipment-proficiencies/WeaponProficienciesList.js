import { Armor } from "../../api/resources/equipment/Armor.js";
import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { EquipmentCategory } from "../../api/resources/EquipmentCategory.js";
import { ArmorProficiencyDisplay } from "./ArmorProficiencyDisplay.js";
import { WeaponProficiencyDisplay } from "./WeaponProficiencyDisplay.js";

export class EquipmentProficienciesList extends HTMLUListElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.equipmentCategoryIndex = this.getAttribute("equipmentCategoryIndex");
        this.isArmor = this.getAttribute("isArmor");

        this.classList.add('no-style-list');
        this.classList.add('proficiencies-list');
    }

    async connectedCallback() {
        const results = await EquipmentCategory.getAsync(this.equipmentCategoryIndex);

        for (const equipmentInfo of results.equipment) {
            if (this.isArmor == "true") {
                const armor = await Armor.getAsync(equipmentInfo.index);
                this.appendChild(new ArmorProficiencyDisplay(armor));
            }
            else {
                const weapon = await Weapon.getAsync(equipmentInfo.index);
                this.appendChild(new WeaponProficiencyDisplay(weapon));
            }
        }

        this.classList.add(this.getNumberOfColumnsClassName(results.equipment.length));
    }

    /**
     * Get the appropriate "number of columns" class name.
     * @param {number} listLength 
     * @returns {string}
     */
    getNumberOfColumnsClassName(listLength) {
        if (listLength >= 9) {
            return 'three-columns-list';
        }
    
        if (listLength >= 4) {
            return 'two-columns-list';
        }
    }


}

customElements.define('equipment-proficiencies-list', EquipmentProficienciesList, { extends: 'ul' });