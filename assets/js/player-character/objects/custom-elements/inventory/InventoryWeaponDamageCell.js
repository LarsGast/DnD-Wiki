import { Weapon } from "../../api/resources/equipment/Weapon.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class InventoryDamageCell extends HTMLTableCellElement {
    /**
     * 
     * @param {Weapon} weapon 
     */
    constructor(weapon, rowIndex) {
        super();
        
        this.weapon = weapon;
        this.rowIndex = rowIndex;

        this.damageBonusSpan = document.createElement('span');

        this.appendChild(document.createTextNode(this.weapon.damage.damage_dice));
        this.appendChild(this.damageBonusSpan);
    }

    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.addEventListener("inventoryWeaponAbilityChanged", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.removeEventListener("inventoryWeaponAbilityChanged", this._updateHandler);
    }

    updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            const damageBonusValue = this.getDamageBonusValue();
            this.damageBonusSpan.textContent = damageBonusValue;

            if (damageBonusValue >= 0) {
                this.damageBonusSpan.classList.add("expressive-positive-number");
            }
            else {
                this.damageBonusSpan.classList.remove("expressive-positive-number");
            }
        }
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    shouldUpdateDisplay(event) {

        const inventoryWeapon = globalPlayerCharacter.inventoryWeapons[this.rowIndex];

        return !event || 
            (event.type === "abilityScoreModifierChanged" && event.detail.ability === inventoryWeapon.ability) ||
            (event.type === "inventoryWeaponAbilityChanged" && event.detail.index === this.rowIndex);
    }

    getDamageBonusValue() {
        const inventoryWeapon = globalPlayerCharacter.inventoryWeapons[this.rowIndex];

        return globalPlayerCharacter.getAbilityModifier(inventoryWeapon.ability);
    }
}

customElements.define("inventory-weapon-damage-cell", InventoryDamageCell, { extends: 'td' });