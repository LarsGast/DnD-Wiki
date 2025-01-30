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
    const div = document.getElementById('weapon-proficiencies-container');

    div.appendChild(getProficienciesContainer("Simple Melee", await getAllSimpleMeleeWeaponNamesAsync()));
    div.appendChild(getProficienciesContainer("Martial Melee", await getAllMartialMeleeWeaponNamesAsync()));
    div.appendChild(getProficienciesContainer("Simple Ranged", await getAllSimpleRangedWeaponNamesAsync()));
    div.appendChild(getProficienciesContainer("Martial Ranged", await getAllMartialRangedWeaponNamesAsync()));
}

const getProficienciesContainer = function(title, itemNames) {
    const div = document.createElement('div');

    div.appendChild(getProficienciesContainerHeader(title));
    div.appendChild(getProficienciesContainerBody(itemNames));

    return div
}

const getProficienciesContainerHeader = function(title) {
    const h4 = document.createElement('h4');

    h4.textContent = title;

    return h4;
}

const getProficienciesContainerBody = function(itemNames) {
    const ul = document.createElement('ul');

    ul.classList.add('no-style-list');
    ul.classList.add('proficiencies-list');

    itemNames.forEach(itemName => {
        ul.appendChild(getProficiencyItem(itemName));
    })

    return ul;
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