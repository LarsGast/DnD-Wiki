import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class InventoryWeaponButtonsCell extends HTMLTableCellElement {
    /**
     * 
     * @param {Weapon} weapon 
     */
    constructor(weapon, rowIndex) {
        super();

        this.weapon = weapon;
        this.rowIndex = rowIndex;

        this.deleteButton = document.createElement('button');
        this.deleteButton.type = "button";
        this.deleteButton.textContent = "Delete";

        this.appendChild(this.deleteButton);

        this.deleteButton.onclick = () => this.deleteRow();
    }

    deleteRow() {
        globalPlayerCharacter.removeWeaponFromInventory(this.rowIndex);

        document.dispatchEvent(new Event("inventoryWeaponDeleted"));
    }
}

customElements.define("inventory-weapon-buttons-cell", InventoryWeaponButtonsCell, { extends: 'td' });