import { getAllRaceNamesAsync, getAllBackgroundNamesAsync } from "./api.js";

/**
 * Fill all elements in the generic info section.
 */
export const fillGenericInfoElements = async function() {
    await fillRaceSelect();
    await fillBackgroundSelect();
}

/**
 * Fill the race select element.
 */
const fillRaceSelect = async function() {
    const allRaceNames = await getAllRaceNamesAsync();

    const select = document.getElementById("race_s");

    select.appendChild(getEmptyOption());

    allRaceNames.forEach(raceName => {
        select.appendChild(getSelectOption(raceName));
    });
}

const fillBackgroundSelect = async function() {
    const allRaceNames = await getAllBackgroundNamesAsync();

    const select = document.getElementById("background_s");

    select.appendChild(getEmptyOption());

    allRaceNames.forEach(raceName => {
        select.appendChild(getSelectOption(raceName));
    });
}

/**
 * Get an empty option for select elements.
 * @returns {HTMLOptionElement}
 */
const getEmptyOption = function() {

    const emptyOption = document.createElement('option');

    emptyOption.disabled = true;
    emptyOption.selected = true;
    emptyOption.textContent = "-- Select an option --";

    return emptyOption;
}

/**
 * Get an option for a select element.
 * @param {string} optionValue
 * @returns {HTMLOptionElement} 
 */
const getSelectOption = function(optionValue) {
    const option = document.createElement('option');

    option.value = optionValue;
    option.textContent = optionValue;

    return option;
}