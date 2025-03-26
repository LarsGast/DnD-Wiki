import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class InventoryWeaponAttackBonusCell extends HTMLTableCellElement {
    /**
     * 
     * @param {Weapon} weapon 
     */
    constructor(weapon, rowIndex) {
        super();

        this.weapon = weapon;
        this.rowIndex = rowIndex;
    }

    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("proficiencyBonusChanged", this._updateHandler);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.addEventListener("weaponProficiencyChanged", this._updateHandler);
        document.addEventListener("inventoryWeaponAbilityChanged", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("proficiencyBonusChanged", this._updateHandler);
        document.removeEventListener("abilityScoreModifierChanged", this._updateHandler);
        document.removeEventListener("weaponProficiencyChanged", this._updateHandler);
        document.removeEventListener("inventoryWeaponAbilityChanged", this._updateHandler);
    }

    updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            const attackBonusValue = this.getAttackBonusValue();
            this.textContent = attackBonusValue;

            if (attackBonusValue > 0) {
                this.classList.add("expressive-positive-number");
            }
            else {
                this.classList.remove("expressive-positive-number");
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
            (event.type === "proficiencyBonusChanged") ||
            (event.type === "abilityScoreModifierChanged" && event.detail.ability === inventoryWeapon.ability) ||
            (event.type === "weaponProficiencyChanged" && event.detail.weapon === this.weapon.index) ||
            (event.type === "inventoryWeaponAbilityChanged" && event.detail.index === this.rowIndex);
    }

    getAttackBonusValue() {
        const inventoryWeapon = globalPlayerCharacter.inventoryWeapons[this.rowIndex];

        return globalPlayerCharacter.getWeaponAttackBonus(inventoryWeapon.index, inventoryWeapon.ability);
    }
}

customElements.define("inventory-weapon-attack-bonus-cell", InventoryWeaponAttackBonusCell, { extends: 'td' });