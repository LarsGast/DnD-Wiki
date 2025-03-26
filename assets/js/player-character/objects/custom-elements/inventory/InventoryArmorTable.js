import { Armor } from "../../api/resources/equipment/Armor.js";
import { InventoryArmorRow } from "./InventoryArmorRow.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class InventoryArmorTable extends HTMLElement {

    /**
     *
     */
    constructor() {
        super();

        this.tableHead = document.createElement('thead');

        const tr = document.createElement('tr');
        
        const nameHead = document.createElement('th');
        nameHead.id = "armor_name";
        nameHead.textContent = "Name";
        
        const typeHead = document.createElement('th');
        typeHead.id = "armor_type";
        typeHead.textContent = "Type";
        
        const strengthHead = document.createElement('th');
        strengthHead.id = "armor_strength-requirement";
        strengthHead.textContent = "Strength";
        
        const stealthHead = document.createElement('th');
        stealthHead.id = "armor_disadvantage-on-stealth";
        stealthHead.textContent = "Stealth";
        
        const armorClassHead = document.createElement('th');
        armorClassHead.id = "armor_armor-class";
        armorClassHead.textContent = "Armor class";
        
        const effectiveArmorClassHead = document.createElement('th');
        effectiveArmorClassHead.id = "armor_effective-armor-class";
        effectiveArmorClassHead.textContent = "Effective armor class";
        
        const weightHead = document.createElement('th');
        weightHead.id = "armor_weight";
        weightHead.textContent = "Weight";
        
        const buttonsHead = document.createElement('th');
        buttonsHead.id = "armor_buttons";
        buttonsHead.textContent = "Buttons";

        tr.appendChild(nameHead);
        tr.appendChild(typeHead);
        tr.appendChild(strengthHead);
        tr.appendChild(stealthHead);
        tr.appendChild(armorClassHead);
        tr.appendChild(effectiveArmorClassHead);
        tr.appendChild(weightHead);
        tr.appendChild(buttonsHead);

        this.tableHead.appendChild(tr);

        this.tableBody = document.createElement('tbody');

        this.table = document.createElement('table');

        this.table.appendChild(this.tableHead);
        this.table.appendChild(this.tableBody);

        this.appendChild(this.table);
    }

    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("inventoryArmorAdded", this._updateHandler);
        document.addEventListener("inventoryArmorDeleted", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("inventoryArmorAdded", this._updateHandler);
        document.removeEventListener("inventoryArmorDeleted", this._updateHandler);
    }

    async updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            const tableBody = this.table.querySelector('tbody');
            tableBody.replaceChildren();

            for (const inventoryArmor of globalPlayerCharacter.inventoryArmor) {
                const armor = await Armor.getAsync(inventoryArmor.index);

                tableBody.appendChild(new InventoryArmorRow(armor));
            }
        }
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    shouldUpdateDisplay(event) {

        return !event ||
            (event.type === "inventoryArmorAdded") ||
            (event.type === "inventoryArmorDeleted");
    }
}

customElements.define("inventory-armor-table", InventoryArmorTable);