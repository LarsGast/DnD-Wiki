import { globalPlayerCharacter } from "../../objects/PlayerCharacter.js";
import { ApiCategory, getApiResultsAsync } from "../../api.js";
import { getEmptyOption, getSelectOption } from "../../util.js";
import { updateRaceFeaturesSection } from "../init-race-features.js";
import { updateSubraceFeaturesSection } from "../init-subrace-features.js";
import { Race } from "../../objects/Race.js";
import { ApiObjectInfo } from "../../objects/ApiObjectInfo.js";

/**
 * Initialize the race select element.
 */
export const initRace = async function() {

    await updateRaceFeaturesSection();

    const select = document.getElementById("race_s");

    select.value = globalPlayerCharacter.race;
    select.onchange = async function() {
        globalPlayerCharacter.setProperty("race", this.value);
        await updateSubraceSelection();
        globalPlayerCharacter.setProperty("subrace", null);
        await updateRaceFeaturesSection();
        await updateSubraceFeaturesSection();
    }
}

/**
 * Initialize the subrace select element.
 */
export const initSubRace = async function() {
    await updateSubraceSelection();
    await updateSubraceFeaturesSection();

    const select = document.getElementById("subrace_s");

    select.value = globalPlayerCharacter.subrace;
    select.onchange = async function() {
        globalPlayerCharacter.setProperty("subrace", this.value);
        await updateSubraceFeaturesSection();
    }
}

/**
 * Update the subrace select element to contain all possible subraces linked to the current race.
 */
const updateSubraceSelection = async function() {

    const select = document.getElementById("subrace_s");
    select.replaceChildren();

    select.appendChild(getEmptyOption());

    const allSubRaces = await getAllSubraces();
    for (const subrace of allSubRaces) {
        select.appendChild(getSelectOption(subrace.name, subrace.index));
    }
}

/**
 * Get all subraces available for the current race.
 * @returns {Promise<ApiObjectInfo[]>} Empty array if a race does not have any subraces.
 */
const getAllSubraces = async function() {

    const raceIndex = globalPlayerCharacter.race;
    const race = await Race.getAsync(raceIndex);

    if (!race.subraces || race.subraces.length === 0) {
        return [];
    }

    return race.subraces;
}