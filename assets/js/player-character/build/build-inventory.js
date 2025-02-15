import { ApiCategory, EquipmentCategoryIndex, getApiResultsAsync } from "../api.js";
import { getEmptyOption } from "../util.js";

/**
 * Build the inventory section.
 */
export const buildInventory = async function() {
    await buildWeaponSelect();
    await buildArmorSelect();
}

/**
 * Build the weapons part of the inventory section.
 * Add all the weapons to the dropdown so the user can pick any supported weapon.
 */
const buildWeaponSelect = async function() {
    const select = document.getElementById('weapon-select');

    select.appendChild(getEmptyOption());
    select.appendChild(getSelectOptionGroup("Simple Melee", (await getApiResultsAsync(ApiCategory.EquipmentCategories, EquipmentCategoryIndex.SimpleMeleeWeapons)).equipment));
    select.appendChild(getSelectOptionGroup("Martial Melee", (await getApiResultsAsync(ApiCategory.EquipmentCategories, EquipmentCategoryIndex.MartialMeleeWeapons)).equipment));
    select.appendChild(getSelectOptionGroup("Simple Ranged", (await getApiResultsAsync(ApiCategory.EquipmentCategories, EquipmentCategoryIndex.SimpleRangedWeapons)).equipment));
    select.appendChild(getSelectOptionGroup("Martial Ranged", (await getApiResultsAsync(ApiCategory.EquipmentCategories, EquipmentCategoryIndex.MartialRangedWeapons)).equipment));
}

/**
 * Build the armor part of the inventory section.
 * Add all the armor to the dropdown so the user can pick any supported armor.
 */
const buildArmorSelect = async function() {
    const select = document.getElementById('armor-select');

    select.appendChild(getEmptyOption());
    select.appendChild(getSelectOptionGroup("Light", (await getApiResultsAsync(ApiCategory.EquipmentCategories, EquipmentCategoryIndex.LightArmor)).equipment));
    select.appendChild(getSelectOptionGroup("Medium", (await getApiResultsAsync(ApiCategory.EquipmentCategories, EquipmentCategoryIndex.MediumArmor)).equipment));
    select.appendChild(getSelectOptionGroup("Heavy", (await getApiResultsAsync(ApiCategory.EquipmentCategories, EquipmentCategoryIndex.HeavyArmor)).equipment));
}

/**
 * Get a single option group to divide the different equipment types.
 * @param {string} optgroupLabel Name of this group.
 * @param {object[]} equipmentList Full equipment objects.
 * @returns 
 */
const getSelectOptionGroup = function(optgroupLabel, equipmentList) {
    const optgroup = document.createElement('optgroup');

    optgroup.label = optgroupLabel;

    equipmentList.forEach(equipment => {
        const option = document.createElement('option');

        // Add the index as the value so we can find it later.
        option.value = equipment.index;
        option.textContent = equipment.name;

        optgroup.appendChild(option);
    });

    return optgroup;
}