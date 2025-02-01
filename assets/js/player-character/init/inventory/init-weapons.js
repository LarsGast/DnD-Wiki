/**
 * Init the weapons section of the inventory.
 */
export const initWeapons = function() {
    initAddWeaponButton();
}

/**
 * Initialize the button to add a new weapon to the inventory.
 */
const initAddWeaponButton = function() {
    const addWeaponButton = document.getElementById('add-weapon-button');

    addWeaponButton.onclick = () => {
        const weaponsTable = document.getElementById('weapons-table');
        const weaponsTableBody = weaponsTable.querySelector('tbody');

        const row = getNewRow();

        weaponsTableBody.appendChild(row);
    };
}

/**
 * Get a new row for the weapons table.
 * @returns {HTMLTableRowElement}
 */
const getNewRow = function() {
    const tr = document.createElement('tr');

    tr.appendChild(getNewNameCell());
    tr.appendChild(getNewProficientCell());
    tr.appendChild(getNewAbilityCell());
    tr.appendChild(getNewAttackBonusCell());
    tr.appendChild(getNewDamageCell());
    tr.appendChild(getNewDamageTypeCell());
    tr.appendChild(getNewRangeCell());
    tr.appendChild(getNewButtonsCell());

    return tr;
}

/**
 * Get a new cell for the "Name" column.
 * @returns {HTMLTableCellElement}
 */
const getNewNameCell = function() {
    const td = getNewCell("name");

    return td;
}

/**
 * Get a new cell for the "Proficient" column.
 * @returns {HTMLTableCellElement}
 */
const getNewProficientCell = function() {
    const td = getNewCell("proficient");

    return td;
}

/**
 * Get a new cell for the "Ability" column.
 * @returns {HTMLTableCellElement}
 */
const getNewAbilityCell = function() {
    const td = getNewCell("ability");

    return td;
}

/**
 * Get a new cell for the "Attack bonus" column.
 * @returns {HTMLTableCellElement}
 */

const getNewAttackBonusCell = function() {
    const td = getNewCell("attack-bonus");

    return td;
}

/**
 * Get a new cell for the "Damage" column.
 * @returns {HTMLTableCellElement}
 */
const getNewDamageCell = function() {
    const td = getNewCell("damage");

    return td;
}

/**
 * Get a new cell for the "Damage type" column.
 * @returns {HTMLTableCellElement}
 */
const getNewDamageTypeCell = function() {
    const td = getNewCell("damage-type");

    return td;
}

/**
 * Get a new cell for the "Range" column.
 * @returns {HTMLTableCellElement}
 */
const getNewRangeCell = function() {
    const td = getNewCell("range");

    return td;
}

/**
 * Get a new cell for the "Buttons" column.
 * @returns {HTMLTableCellElement}
 */
const getNewButtonsCell = function() {
    const td = getNewCell("weapon_buttons");

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