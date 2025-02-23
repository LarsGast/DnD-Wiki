import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";
import { ApiCategory, getApiResultsAsync } from "../../api.js";

/**
 * Initialize the race select element.
 */
export const initRace = function() {

    const select = document.getElementById("race_s");

    select.value = getPlayerCharacterProperty("race");
    select.onchange = async function() {
        setPlayerCharacterProperty("race", this.value);
        await updateRaceFeaturesSection(this.value);
    }
}

const updateRaceFeaturesSection = async function(raceIndex) {

    const race = await getApiResultsAsync(ApiCategory.Races, raceIndex);

    setRaceFeaturesProperty(race, "name");
    setRaceFeaturesAbilityBonuses(race);
    setRaceFeatureStartingProficiencies(race);
    setRaceFeaturesProperty(race, "speed");
    setRaceFeaturesProperty(race, "alignment");
    setRaceFeaturesProperty(race, "age");
    setRaceFeaturesSize(race);
    setRaceFeaturesLanguages(race);
    await setRaceFeaturesTraits(race);
}

const setRaceFeaturesProperty = function(race, propertyName) {
    const p = document.getElementById(`race_${propertyName}`);

    p.textContent = race[propertyName];
}

const setRaceFeaturesAbilityBonuses = function(race) {
    const p = document.getElementById("race_ability_bonuses");

    p.textContent = race.ability_bonuses.map(ab => `${ab.ability_score.name}+${ab.bonus}`).join(", ") + ".";
}

const setRaceFeatureStartingProficiencies = function(race) {
    const p = document.getElementById("race_starting_proficiencies");

    p.textContent = race.starting_proficiencies.map(p => p.name).join(", ") + ".";
}

const setRaceFeaturesSize = function(race) {
    const p = document.getElementById("race_size");

    p.textContent = race.size_description;
}

const setRaceFeaturesLanguages = function(race) {
    const p = document.getElementById("race_languages");

    p.textContent = race.language_desc;
}

const setRaceFeaturesTraits = async function(race) {
    const div = document.getElementById("race_traits");
    div.replaceChildren();

    for (const traitInfo of race.traits) {
        const trait = await getApiResultsAsync(ApiCategory.Traits, traitInfo.index);
        div.appendChild(getRaceTraitHeading(trait));
        div.appendChild(getRaceTraitDescription(trait));
    }
}

const getRaceTraitHeading = function(trait) {
    const heading = document.createElement('h4');

    heading.textContent = trait.name;

    return heading;
}

const getRaceTraitDescription = function(trait) {
    const p = document.createElement('p');

    p.textContent = trait.desc;

    return p;
}