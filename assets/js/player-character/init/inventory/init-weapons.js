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

    const input = document.createElement('input');

    td.appendChild(input);

    return td;
}

/**
 * Get a new cell for the "Proficient" column.
 * @returns {HTMLTableCellElement}
 */
const getNewProficientCell = function() {
    const td = getNewCell("proficient");

    const input = document.createElement('input');
    input.type = "checkbox";
    
    td.appendChild(input);

    return td;
}

/**
 * Get a new cell for the "Ability" column.
 * @returns {HTMLTableCellElement}
 */
const getNewAbilityCell = function() {
    const td = getNewCell("ability");

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

    const diceAmountInput = document.createElement('input');
    diceAmountInput.type = "number";

    const diceSelect = document.createElement('select');

    const d4Option = document.createElement('option');
    d4Option.value = "d4";
    d4Option.textContent = "d4";

    const d6Option = document.createElement('option');
    d6Option.value = "d6";
    d6Option.textContent = "d6";

    const d8Option = document.createElement('option');
    d8Option.value = "d8";
    d8Option.textContent = "d8";

    const d10Option = document.createElement('option');
    d10Option.value = "d10";
    d10Option.textContent = "d10";

    const d12Option = document.createElement('option');
    d12Option.value = "d12";
    d12Option.textContent = "d12";

    diceSelect.appendChild(d4Option);
    diceSelect.appendChild(d6Option);
    diceSelect.appendChild(d8Option);
    diceSelect.appendChild(d10Option);
    diceSelect.appendChild(d12Option);

    td.appendChild(diceAmountInput);
    td.appendChild(diceSelect);

    return td;
}

/**
 * Get a new cell for the "Damage type" column.
 * @returns {HTMLTableCellElement}
 */
const getNewDamageTypeCell = function() {
    const td = getNewCell("damage-type");

    const select = document.createElement('select');

    td.appendChild(select);

    return td;
}

/**
 * Get a new cell for the "Range" column.
 * @returns {HTMLTableCellElement}
 */
const getNewRangeCell = function() {
    const td = getNewCell("range");

    const input = document.createElement('input');

    td.appendChild(input);

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

    const importButton = document.createElement('button');
    importButton.type = "button";
    importButton.textContent = "Import";

    td.appendChild(deleteButton);
    td.appendChild(importButton);

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