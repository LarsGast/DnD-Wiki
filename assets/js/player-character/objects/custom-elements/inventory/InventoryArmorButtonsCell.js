import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class InventoryArmorButtonsCell extends HTMLTableCellElement {
    /**
     * 
     * @param {Armor} armor 
     */
    constructor(armor, rowIndex) {
        super();

        this.armor = armor;
        this.rowIndex = rowIndex;

        this.deleteButton = document.createElement('button');
        this.deleteButton.type = "button";
        this.deleteButton.textContent = "Delete";

        this.appendChild(this.deleteButton);

        this.deleteButton.onclick = () => this.deleteRow();
    }

    deleteRow() {
        globalPlayerCharacter.removeArmorFromInventory(this.rowIndex);

        document.dispatchEvent(new Event("inventoryArmorDeleted"));
    }
}

customElements.define("inventory-armor-buttons-cell", InventoryArmorButtonsCell, { extends: 'td' });