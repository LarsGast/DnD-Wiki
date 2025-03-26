import { EquipmentCategoryIndex } from "../api.js";
import { getEmptyOption } from "../util.js";
import { globalPlayerCharacter } from "./PlayerCharacter.js";
import { EquipmentCategory } from "./api/resources/EquipmentCategory.js";
import { Armor } from "./api/resources/equipment/Armor.js";

export class InventoryArmorAddInput extends HTMLElement {

    /**
     *
     */
    constructor() {
        super();
        
        this.armorSelect = document.createElement('select');
        
        this.addArmorButton = document.createElement('button');
        this.addArmorButton.type = "button";
        this.addArmorButton.textContent = "Add armor";
        this.addArmorButton.disabled = true;

        this.appendChild(this.armorSelect);
        this.appendChild(this.addArmorButton);

        this.armorSelect.onchange = () => this.handleWeaponSelectChange();
        this.addArmorButton.onclick = () => this.addWeapon();
    }

    async connectedCallback() {
        this.armorSelect.appendChild(getEmptyOption());
        this.armorSelect.appendChild(await this.getSelectOptionGroup("Light", EquipmentCategoryIndex.LightArmor));
        this.armorSelect.appendChild(await this.getSelectOptionGroup("Medium", EquipmentCategoryIndex.MediumArmor));
        this.armorSelect.appendChild(await this.getSelectOptionGroup("Heavy", EquipmentCategoryIndex.HeavyArmor));
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
        if (this.armorSelect.value) {
            this.addArmorButton.disabled = false;
        }
    }

    async addWeapon() {
        const armorIndex = this.armorSelect.value;

        const armor = await Armor.getAsync(armorIndex);

        globalPlayerCharacter.addArmorToInventory(armor.index);

        document.dispatchEvent(new Event("inventoryArmorAdded"));

        this.armorSelect.value = "null";
        this.addArmorButton.disabled = true;
    }
}

customElements.define("inventory-armor-add-input", InventoryArmorAddInput)