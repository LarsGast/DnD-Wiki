import { Weapon } from "./api/resources/equipment/Weapon.js";
import { InventoryWeaponRow } from "./InventoryWeaponRow.js";
import { globalPlayerCharacter } from "./PlayerCharacter.js";

export class InventoryWeaponTable extends HTMLElement {

    /**
     *
     */
    constructor() {
        super();

        this.tableHead = document.createElement('thead');

        const tr = document.createElement('tr');
        
        const nameHead = document.createElement('th');
        nameHead.id = "weapon_name";
        nameHead.textContent = "Name";
        
        const abilityHead = document.createElement('th');
        abilityHead.id = "weapon_ability";
        abilityHead.textContent = "Ability";
        
        const attackBonusHead = document.createElement('th');
        attackBonusHead.id = "weapon_attack-bonus";
        attackBonusHead.textContent = "Attack bonus";
        
        const damageHead = document.createElement('th');
        damageHead.id = "weapon_damage";
        damageHead.textContent = "Damage";
        
        const damageTypeHead = document.createElement('th');
        damageTypeHead.id = "weapon_damage-type";
        damageTypeHead.textContent = "Damage type";
        
        const rangeHead = document.createElement('th');
        rangeHead.id = "weapon_range";
        rangeHead.textContent = "Range";
        
        const weightHead = document.createElement('th');
        weightHead.id = "weapon_weight";
        weightHead.textContent = "Weight";
        
        const buttonsHead = document.createElement('th');
        buttonsHead.id = "weapon_buttons";
        buttonsHead.textContent = "Buttons";

        tr.appendChild(nameHead);
        tr.appendChild(abilityHead);
        tr.appendChild(attackBonusHead);
        tr.appendChild(damageHead);
        tr.appendChild(damageTypeHead);
        tr.appendChild(rangeHead);
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
        document.addEventListener("inventoryWeaponAdded", this._updateHandler);
        document.addEventListener("inventoryWeaponDeleted", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("inventoryWeaponAdded", this._updateHandler);
        document.removeEventListener("inventoryWeaponDeleted", this._updateHandler);
    }

    async updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            const tableBody = this.table.querySelector('tbody');
            tableBody.replaceChildren();

            for (const inventoryWeapon of globalPlayerCharacter.inventoryWeapons) {
                const weapon = await Weapon.getAsync(inventoryWeapon.index);

                tableBody.appendChild(new InventoryWeaponRow(weapon));
            }
        }
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    shouldUpdateDisplay(event) {

        return !event ||
            (event.type === "inventoryWeaponAdded") ||
            (event.type === "inventoryWeaponDeleted");
    }
}

customElements.define("inventory-weapon-table", InventoryWeaponTable);