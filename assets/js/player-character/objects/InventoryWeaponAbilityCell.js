import { Weapon } from "./api/resources/equipment/Weapon.js";
import { getSelectOption } from "../util.js"
import { globalPlayerCharacter } from "./PlayerCharacter.js";

export class InventoryWeaponAbilityCell extends HTMLTableCellElement {
    /**
     * 
     * @param {Weapon} weapon 
     */
    constructor(weapon, rowIndex) {
        super();

        this.weapon = weapon;
        this.rowIndex = rowIndex;
        
        if (this.weapon.hasMultipleAbilities()) {
            this.select = document.createElement('select');
            this.select.appendChild(getSelectOption("STR", "str"));
            this.select.appendChild(getSelectOption("DEX", "dex"));
            this.select.value = this.getDefaultAbility();

            this.appendChild(this.select);

            this.select.onchange = () => this.handleChange();
        }
        else {
            this.textContent = this.getDefaultAbility().toUpperCase();
        }
    }

    handleChange() {
        globalPlayerCharacter.editWeaponAbility(this.rowIndex, this.select.value);

        document.dispatchEvent(new CustomEvent("inventoryWeaponAbilityChanged", {
            detail: { 
                index: this.rowIndex 
            },
            bubbles: true
        }));
    }

    getDefaultAbility() {
        const inventoryWeapon = globalPlayerCharacter.inventoryWeapons[this.rowIndex];
        return inventoryWeapon.ability;
    }
}

customElements.define("inventory-weapon-ability-cell", InventoryWeaponAbilityCell, { extends: 'td' });