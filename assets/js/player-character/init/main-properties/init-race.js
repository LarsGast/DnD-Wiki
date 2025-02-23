import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";
import { ApiCategory, getApiResultsAsync } from "../../api.js";
import { getEmptyOption, getSelectOption } from "../../util.js";

/**
 * Initialize the race select element.
 */
export const initRace = function() {

    const select = document.getElementById("race_s");

    select.value = getPlayerCharacterProperty("race");
    select.onchange = async function() {
        setPlayerCharacterProperty("race", this.value);
        await updateRaceFeaturesSection();
        await updateSubraceSelection();
    }
}

export const initSubRace = async function() {

    await updateSubraceSelection();

    const select = document.getElementById("subrace_s");

    select.value = getPlayerCharacterProperty("subrace");
    select.onchange = async function() {
        setPlayerCharacterProperty("subrace", this.value);
        await updateRaceFeaturesSection();
    }
}

const updateSubraceSelection = async function() {
    const race = await getApiResultsAsync(ApiCategory.Races, getPlayerCharacterProperty("race"));

    const select = document.getElementById("subrace_s");
    select.replaceChildren();

    select.appendChild(getEmptyOption());

    race.subraces.forEach(subrace => {
        select.appendChild(getSelectOption(subrace.name, subrace.index));
    });

    setPlayerCharacterProperty("subrace", null);
}

const updateRaceFeaturesSection = async function() {

    const race = await getApiResultsAsync(ApiCategory.Races, getPlayerCharacterProperty("race"));

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
    const ul = document.getElementById("race_ability_bonuses");
    ul.replaceChildren();

    for (const abilityBonus of race.ability_bonuses) {
        const li = document.createElement('li');

        li.textContent = `${abilityBonus.ability_score.name} + ${abilityBonus.bonus}`;

        ul.appendChild(li);
    }
}

const setRaceFeatureStartingProficiencies = function(race) {
    const ul = document.getElementById("race_starting_proficiencies");
    ul.replaceChildren();

    if (race.starting_proficiencies.length === 0) {
        const li = document.createElement('li');

        li.textContent = "none";

        ul.appendChild(li);
        return;
    }

    for (const proficiency of race.starting_proficiencies) {
        const li = document.createElement('li');

        li.textContent = proficiency.name;

        ul.appendChild(li);
    }
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