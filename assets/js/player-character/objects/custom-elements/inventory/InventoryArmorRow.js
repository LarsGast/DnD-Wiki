import { Armor } from "../../api/resources/equipment/Armor.js";
import { InventoryArmorButtonsCell } from "./InventoryArmorButtonsCell.js";
import { InventoryArmorEffectiveArmorClassCell } from "./InventoryArmorEffectiveArmorClassCell.js";

export class InventoryArmorRow extends HTMLTableRowElement {
    /**
     * 
     * @param {Armor} armor 
     */
    constructor(armor) {
        super();

        this.armor = armor;
    }
    
    connectedCallback() {

        this.nameCell = document.createElement('td');
        this.nameCell.headers = 'armor_name';
        this.nameCell.textContent = this.armor.name;

        this.typeCell = document.createElement('td');
        this.typeCell.headers = 'armor_type';
        this.typeCell.textContent = this.armor.armor_category;

        this.strengthCell = document.createElement('td');
        this.strengthCell.headers = 'armor_strength-requirement';
        this.strengthCell.textContent = this.armor.str_minimum === 0 ? "-" : this.armor.str_minimum;

        this.stealthCell = document.createElement('td');
        this.stealthCell.headers = 'armor_disadvantage-on-stealth';
        this.stealthCell.textContent = this.armor.stealth_disadvantage ? "Disadvantage" : "-";

        this.armorClassCell = document.createElement('td');
        this.armorClassCell.headers = 'armor_armor-class';
        this.armorClassCell.textContent = this.armor.armor_class.getDisplayString();

        this.effectiveArmorClassCell = new InventoryArmorEffectiveArmorClassCell(this.armor);
        this.effectiveArmorClassCell.headers = 'armor_effective-armor-class';

        this.weightCell = document.createElement('td');
        this.weightCell.headers = 'armor_weight';
        this.weightCell.textContent = this.armor.weight;

        this.buttonsCell = new InventoryArmorButtonsCell(this.armor, this.rowIndex - 1);
        this.buttonsCell.headers = 'armor_buttons';

        this.appendChild(this.nameCell);
        this.appendChild(this.typeCell);
        this.appendChild(this.strengthCell);
        this.appendChild(this.stealthCell);
        this.appendChild(this.armorClassCell);
        this.appendChild(this.effectiveArmorClassCell);
        this.appendChild(this.weightCell);
        this.appendChild(this.buttonsCell);
    }
}

customElements.define("inventory-armor-row", InventoryArmorRow, { extends: 'tr' });