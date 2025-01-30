import { isProficientInWeapon, saveNewWeaponProficiencies } from "../util.js";

/**
 * Initialize all elements for the equipment proficiencies on the PC builder page.
 */
export const initEquipmentProficiencies = function() {
    initWeaponProficiencies();
}

/**
 * Initialize the weapon proficiencies.
 */
const initWeaponProficiencies = function() {
    const weaponProficienciesList = document.getElementById('weapon-proficiencies-container');
    const weaponProficiencyItems = Array.from(weaponProficienciesList.querySelectorAll('li'));
    weaponProficiencyItems.forEach(weaponProficiencyItem => {
        initWeaponProficiencyListItem(weaponProficiencyItem);
    });
}

/**
 * Initialize a single li weapon proficiency element.
 * @param {HTMLLIElement} weaponProficiencyItem 
 */
const initWeaponProficiencyListItem = function(weaponProficiencyItem) {

    const weaponProficiencyCheckbox = weaponProficiencyItem.querySelector('input');
    const weaponProficiencyLabel = weaponProficiencyItem.querySelector('label'); 

    weaponProficiencyCheckbox.checked = isProficientInWeapon(weaponProficiencyLabel.textContent);
    weaponProficiencyCheckbox.onchange = function () {
        saveNewWeaponProficiencies(weaponProficiencyLabel.textContent, this.checked);
    };
}