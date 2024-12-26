import { getAllSimpleMeleeWeaponNamesAsync, getAllMartialMeleeWeaponNamesAsync, getAllSimpleRangedWeaponNamesAsync, getAllMartialRangedWeaponNamesAsync } from "../api.js";
import { getProficiencyCheckbox } from "../util.js";

/**
 * Buil the equipment proficiencies lists.
 */
export const buildEquipmentProficiencies = async function() {
    await fillWeaponProficienciesList();
}

/**
 * Fill the weapon proficiencies list.
 */
const fillWeaponProficienciesList = async function() {
    const ul = document.getElementById('weapon-proficiencies-list');

    ul.appendChild(getListItem("Simple Melee Weapons", await getAllSimpleMeleeWeaponNamesAsync()));
    ul.appendChild(getListItem("Martial Melee Weapons", await getAllMartialMeleeWeaponNamesAsync()));
    ul.appendChild(await getRangedListItem());
}

/**
 * Get the list item for both simple and martial ranges weapons.
 * @returns {HTMLDivElement}
 */
const getRangedListItem = async function() {
    const div = document.createElement('div');

    div.appendChild(getListItem("Simple Ranged Weapons", await getAllSimpleRangedWeaponNamesAsync()));
    div.appendChild(getListItem("Martial Ranged Weapons", await getAllMartialRangedWeaponNamesAsync()));

    return div;
}

/**
 * Get a ul element containing all weapons of given title
 * @param {string} title 
 * @param {string[]} itemNames 
 * @returns {HTMLLIElement}
 */
const getListItem = function(title, itemNames) {
    const li = document.createElement('li');

    li.appendChild(getProficiencyCheckbox(title));
    li.appendChild(getEquipmentLabel(title));
    li.appendChild(getSubList(itemNames));

    return li;
}

/**
 * Get a sub list containing all given items.
 * @param {string[]} itemNames 
 * @returns {HTMLUListElement}
 */
const getSubList = function(itemNames) {

    const ul = document.createElement('ul');

    ul.classList.add('no-style-list');

    itemNames.forEach(itemName => {
        ul.appendChild(getProficiencyItem(itemName));
    })

    return ul;
}

/**
 * Get a single li item to indicate proficiency.
 * @param {string} equipmentName 
 * @returns {HTMLLIElement}
 */
const getProficiencyItem = function(equipmentName) {
    const li = document.createElement('li');

    li.appendChild(getProficiencyCheckbox(equipmentName));
    li.appendChild(getEquipmentLabel(equipmentName));

    return li;
}

/**
 * Get the label element that belongs to the given equipment.
 * @param {string} equipmentName 
 * @returns {HTMLLabelElement}
 */
const getEquipmentLabel = function(equipmentName) {
    const label = document.createElement('label');

    label.textContent = equipmentName;

    return label;
}