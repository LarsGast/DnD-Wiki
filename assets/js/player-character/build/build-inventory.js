import { getAllMartialMeleeWeaponsAsync, getAllMartialRangedWeaponsAsync, getAllSimpleMeleeWeaponsAsync, getAllSimpleRangedWeaponsAsync } from "../api.js";
import { getEmptyOption } from "../util.js";

export const buildInventory = async function() {
    await buildWeaponSelect();
}

const buildWeaponSelect = async function() {
    const select = document.getElementById('weapon-select');

    select.appendChild(getEmptyOption());
    select.appendChild(getWeaponOptionGroup("Simple Melee", await getAllSimpleMeleeWeaponsAsync()));
    select.appendChild(getWeaponOptionGroup("Martial Melee", await getAllMartialMeleeWeaponsAsync()));
    select.appendChild(getWeaponOptionGroup("Simple Ranged", await getAllSimpleRangedWeaponsAsync()));
    select.appendChild(getWeaponOptionGroup("Martial Ranged", await getAllMartialRangedWeaponsAsync()));
}

const getWeaponOptionGroup = function(optgroupLabel, weapons) {
    const optgroup = document.createElement('optgroup');

    optgroup.label = optgroupLabel;

    weapons.forEach(weapon => {
        const option = document.createElement('option');

        option.value = weapon.index;
        option.textContent = weapon.name;

        optgroup.appendChild(option);
    });

    return optgroup;
}