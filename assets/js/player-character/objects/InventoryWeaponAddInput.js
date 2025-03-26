import { EquipmentCategoryIndex } from "../api.js";
import { getEmptyOption } from "../util.js";
import { globalPlayerCharacter } from "./PlayerCharacter.js";
import { EquipmentCategory } from "./api/resources/EquipmentCategory.js";
import { Weapon } from "./api/resources/equipment/Weapon.js";

export class InventoryWeaponAddInput extends HTMLElement {

    /**
     *
     */
    constructor() {
        super();
        
        this.weaponSelect = document.createElement('select');
        
        this.addWeaponButton = document.createElement('button');
        this.addWeaponButton.type = "button";
        this.addWeaponButton.textContent = "Add weapon";
        this.addWeaponButton.disabled = true;

        this.appendChild(this.weaponSelect);
        this.appendChild(this.addWeaponButton);

        this.weaponSelect.onchange = () => this.handleWeaponSelectChange();
        this.addWeaponButton.onclick = () => this.addWeapon();
    }

    async connectedCallback() {
        this.weaponSelect.appendChild(getEmptyOption());
        this.weaponSelect.appendChild(await this.getSelectOptionGroup("Simple Melee", EquipmentCategoryIndex.SimpleMeleeWeapons));
        this.weaponSelect.appendChild(await this.getSelectOptionGroup("Martial Melee", EquipmentCategoryIndex.MartialMeleeWeapons));
        this.weaponSelect.appendChild(await this.getSelectOptionGroup("Simple Ranged", EquipmentCategoryIndex.SimpleRangedWeapons));
        this.weaponSelect.appendChild(await this.getSelectOptionGroup("Martial Ranged", EquipmentCategoryIndex.MartialRangedWeapons));
    }

    /**
     * Get a single option group to divide the different equipment types.
     * @param {string} optgroupLabel Name of this group.
     * @param {EquipmentCategoryIndex} equipmentCategoryIndex The index of the category, for getting data from the API.
     * @returns {Promise<HTMLOptGroupElement}
     */
    async getSelectOptionGroup(optgroupLabel, equipmentCategoryIndex) {
        const optgroup = document.createElement('optgroup');
    
        optgroup.label = optgroupLabel;
    
        const results = await EquipmentCategory.getAsync(equipmentCategoryIndex);
    
        results.equipment.forEach(equipment => {
            const option = document.createElement('option');
    
            // Add the index as the value so we can find it later.
            option.value = equipment.index;
            option.textContent = equipment.name;
    
            optgroup.appendChild(option);
        });
    
        return optgroup;
    }

    handleWeaponSelectChange() {
        if (this.weaponSelect.value) {
            this.addWeaponButton.disabled = false;
        }
    }

    async addWeapon() {
        const weaponIndex = this.weaponSelect.value;

        const weapon = await Weapon.getAsync(weaponIndex);

        globalPlayerCharacter.addWeaponToInventory(weapon.index, weapon.getStandardAbility());

        document.dispatchEvent(new Event("inventoryWeaponAdded"));

        this.weaponSelect.value = "null";
        this.addWeaponButton.disabled = true;
    }
}

customElements.define("inventory-weapon-add-input", InventoryWeaponAddInput)