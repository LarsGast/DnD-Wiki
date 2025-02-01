import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";
import { getEquipmentObjectAsync } from "../../api.js";
import { getAbilityScoreModifier, getProficiencyModifier, isProficientInWeapon } from "../../util.js";

/**
 * Init the weapons section of the inventory.
 */
export const initWeapons = async function() {
    await initWeaponTable();
    initWeaponSelect();
    initAddWeaponButton();
}

/**
 * Initialize the weapon inventory table and fill it with the saved weapons.
 */
const initWeaponTable = async function() {

    const weapons = getPlayerCharacterProperty("inventory_weapons") || [];

    for (const weapon of weapons) {
        const weaponFromApi = await getEquipmentObjectAsync(weapon.index);

        addWeaponRow(weaponFromApi, weapon.ability);
    }
}

/**
 * Initialize the weapon select dropdown.
 */
const initWeaponSelect = function() {
    const weaponSelect = document.getElementById('weapon-select');

    // Enable the "Add weapon" button once the user has actually chosen a weapon.
    weaponSelect.onchange = () => {
        const addWeaponButton = document.getElementById('add-weapon-button');
        addWeaponButton.disabled = false;
    }
}

/**
 * Save the entire weapons inventory table to local storage.
 */
const saveWeaponInventory = function() {
    
    const weaponsTable = document.getElementById('weapons-table');
    const weaponsTableBody = weaponsTable.querySelector('tbody');

    const weapons = Array.from(weaponsTableBody.rows).map(row => {
        const weapon = {
            index: row.dataset.index
        };

        // We don't need to save the ability if there is no ambiguity.
        const abilitySelect = row.querySelector('select');
        if (abilitySelect){
            weapon.ability = abilitySelect.value
        }

        return weapon;
    })

    setPlayerCharacterProperty("inventory_weapons", weapons);
}

/**
 * Initialize the button to add a new weapon to the inventory.
 */
const initAddWeaponButton = function() {
    const addWeaponButton = document.getElementById('add-weapon-button');

    addWeaponButton.onclick = async () => {
        const weaponSelect = document.getElementById('weapon-select');
        const weapon = await getEquipmentObjectAsync(weaponSelect.value);

        addWeaponRow(weapon);

        // Disable button until a weapon is chosen again.
        addWeaponButton.disabled = true;
        weaponSelect.value = "empty" ;

        saveWeaponInventory();
    };
}

const addWeaponRow = function(weapon, ability = null) {
    const weaponsTable = document.getElementById('weapons-table');
    const weaponsTableBody = weaponsTable.querySelector('tbody');

    const row = getNewRow(weapon, ability);

    weaponsTableBody.appendChild(row);

    updateAttackBonus(row);
}

/**
 * Get a new row for the weapons table.
 * @returns {HTMLTableRowElement}
 */
const getNewRow = function(weapon, ability = null) {
    const tr = document.createElement('tr');

    tr.dataset.index = weapon.index;
    tr.appendChild(getNewNameCell(weapon));
    tr.appendChild(getNewAbilityCell(weapon, ability));
    tr.appendChild(getNewAttackBonusCell(weapon, ability));
    tr.appendChild(getNewDamageCell(weapon, ability));
    tr.appendChild(getNewDamageTypeCell(weapon));
    tr.appendChild(getNewRangeCell(weapon));
    tr.appendChild(getNewButtonsCell(weapon));

    return tr;
}

/**
 * Get a new cell for the "Name" column.
 * @returns {HTMLTableCellElement}
 */
const getNewNameCell = function(weapon) {
    const td = getNewCell("name");

    td.textContent = weapon.name;

    return td;
}

/**
 * Get a new cell for the "Ability" column.
 * @returns {HTMLTableCellElement}
 */
const getNewAbilityCell = function(weapon, ability = null) {
    const td = getNewCell("ability");

    const abilities = getWeaponAbilities(weapon);

    if (abilities.length > 1) {
        
        const select = document.createElement('select');

        const strengthOption = document.createElement('option');
        strengthOption.value = "strength";
        strengthOption.textContent = "STR";
        
        const dexterityOption = document.createElement('option');
        dexterityOption.value = "dexterity";
        dexterityOption.textContent = "DEX";
    
        select.appendChild(strengthOption);
        select.appendChild(dexterityOption);

        // If given, set the value of the dropdown.
        if (ability) {
            select.value = ability;
        }

        select.onchange = () => {
            saveWeaponInventory();

            const row = select.closest('tr');
            updateAttackBonus(row);
        }
    
        td.appendChild(select);
    }
    else if (abilities.includes("strength")) {
        const span = document.createElement('span');

        span.textContent = "STR";
        span.dataset.ability = "strength";

        td.appendChild(span);
    }
    else {
        const span = document.createElement('span');

        span.textContent = "DEX";
        span.dataset.ability = "dexterity";

        td.appendChild(span);
    }

    return td;
}

/**
 * Get a new cell for the "Attack bonus" column.
 * @returns {HTMLTableCellElement}
 */

const getNewAttackBonusCell = function(weapon, ability = null) {
    const td = getNewCell("attack-bonus");

    return td;
}

/**
 * Get a new cell for the "Damage" column.
 * @returns {HTMLTableCellElement}
 */
const getNewDamageCell = function(weapon) {
    const td = getNewCell("damage");

    td.textContent = weapon.damage.damage_dice;

    return td;
}

/**
 * Get a new cell for the "Damage type" column.
 * @returns {HTMLTableCellElement}
 */
const getNewDamageTypeCell = function(weapon) {
    const td = getNewCell("damage-type");

    td.textContent = weapon.damage.damage_type.name;

    return td;
}

/**
 * Get a new cell for the "Range" column.
 * @returns {HTMLTableCellElement}
 */
const getNewRangeCell = function(weapon) {
    const td = getNewCell("range");

    let rangeText = weapon.range.normal;

    if (weapon.range.long) {
        rangeText += ` / ${weapon.range.long}`;
    }

    td.textContent = rangeText;

    return td;
}

/**
 * Get a new cell for the "Buttons" column.
 * @returns {HTMLTableCellElement}
 */
const getNewButtonsCell = function() {
    const td = getNewCell("weapon_buttons");

    const deleteButton = document.createElement('button');
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.onclick = () => {
        const row = deleteButton.closest('tr');
        row.remove();
        saveWeaponInventory();
    }

    td.appendChild(deleteButton);

    return td;
}

/**
 * Get a new generic cell for a row in the weapons inventory table.
 * @param {string} headerName Name of the column header as specified in the ID of the header cell. 
 * @returns {HTMLTableCellElement}
 */
const getNewCell = function(headerName) {
    const td = document.createElement('td');

    td.headers = `weapon_${headerName}`;

    return td;
}

const getWeaponAbilities = function(weapon) {

    if (weapon.weapon_range === "Ranged") {
        return ["dexterity"];
    }

    if (weapon.properties.some(prop => prop.index === "finesse")) {
        return ["strength", "dexterity"];
    }

    return ["strength"];
}

const updateAttackBonus = function(row) {

    const ability = getAbility(row);

    const abilityModifier = getAbilityScoreModifier(ability);

    const weaponNameCell = row.querySelector('[headers="weapon_name"]');
    const isProficient = isProficientInWeapon(weaponNameCell.textContent);

    let attackBonus = abilityModifier;
    if (isProficient) {
        attackBonus += getProficiencyModifier();
    }

    const attackBonusSpan = document.createElement('span');
    attackBonusSpan.textContent = attackBonus;

    // Add a plus sign to the number to make is more expressive and clear that it is a positive modifier.
    if (attackBonus > 0) {
        attackBonusSpan.classList.add('expressive-positive-number');
    }
    
    const attackBonusCell = row.querySelector('[headers="weapon_attack-bonus"]');
    attackBonusCell.replaceChildren(attackBonusSpan);
}

const getAbility = function(row) {
    const abilityCell = row.querySelector('[headers="weapon_ability"]');

    const span = abilityCell.querySelector('span');
    if (span) {
        return span.dataset.ability;
    }

    const select = abilityCell.querySelector('select');
    return select.value;
}