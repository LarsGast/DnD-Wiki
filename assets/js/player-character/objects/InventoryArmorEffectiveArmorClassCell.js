import { Armor } from "./api/resources/equipment/Armor.js";
import { globalPlayerCharacter } from "./PlayerCharacter.js";

export class InventoryArmorEffectiveArmorClassCell extends HTMLTableCellElement {
    /**
     * 
     * @param {Armor} armor 
     */
    constructor(armor) {
        super();

        this.armor = armor;
    }

    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("abilityScoreModifierChanged", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("abilityScoreModifierChanged", this._updateHandler);
    }

    updateDisplay(event) {
        if (this.shouldUpdateDisplay(event)) {
            this.textContent = this.getEffectiveArmorClassValue();;
        }
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    shouldUpdateDisplay(event) {

        return !event || 
            (event.type === "abilityScoreModifierChanged" && event.detail.ability === "dex" && this.armor.armor_class.dex_bonus);
    }

    getEffectiveArmorClassValue() {
        return this.armor.armor_class.getEffectiveArmorClass(globalPlayerCharacter.getAbilityModifier("dex"));
    }
}

customElements.define("inventory-armor-effective-armor-class-cell", InventoryArmorEffectiveArmorClassCell, { extends: 'td' });