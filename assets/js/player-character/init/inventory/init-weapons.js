import { getEquipmentObjectAsync } from "../../api.js";
import { getAbilityScoreModifier, getProficiencyModifier, isProficientInWeapon } from "../../util.js";

/**
 * Init the weapons section of the inventory.
 */
export const initWeapons = function() {
    initWeaponSelect();
    initAddWeaponButton();
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
    };
}

const addWeaponRow = function(weapon) {
    const weaponsTable = document.getElementById('weapons-table');
    const weaponsTableBody = weaponsTable.querySelector('tbody');

    const row = getNewRow(weapon);

    weaponsTableBody.appendChild(row);
}

/**
 * Get a new row for the weapons table.
 * @returns {HTMLTableRowElement}
 */
const getNewRow = function(weapon) {
    const tr = document.createElement('tr');

    tr.appendChild(getNewNameCell(weapon));
    tr.appendChild(getNewAbilityCell(weapon));
    tr.appendChild(getNewAttackBonusCell(weapon));
    tr.appendChild(getNewDamageCell(weapon));
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
const getNewAbilityCell = function(weapon) {
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
    
        td.appendChild(select);
    }
    else if (abilities.includes("strength")) {
        td.textContent = "STR";
    }
    else {
        td.textContent = "DEX";
    }

    return td;
}

/**
 * Get a new cell for the "Attack bonus" column.
 * @returns {HTMLTableCellElement}
 */

const getNewAttackBonusCell = function(weapon) {
    const td = getNewCell("attack-bonus");

    let abilityModifier = 0;

    const abilities = getWeaponAbilities(weapon);
    if (abilities.includes("strength")) {
        abilityModifier = getAbilityScoreModifier("strength");
    }
    else {
        abilityModifier = getAbilityScoreModifier("dexterity");
    }

    const isProficient = isProficientInWeapon(weapon.name);
    const proficiencyBonus = getProficiencyModifier();

    let attackBonus = abilityModifier;
    if (isProficient){
        attackBonus += proficiencyBonus
    }

    if (attackBonus === 0) {
        td.textContent = 0;
    }
    else if (attackBonus > 0) {
        td.textContent = `+${attackBonus}`;
    }
    else {
        td.textContent = attackBonus;
    }

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