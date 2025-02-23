import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../../../local-storage-util.js";
import { ApiCategory, getApiResultsAsync } from "../../api.js";
import { getEmptyOption, getSelectOption } from "../../util.js";

/**
 * Initialize the race select element.
 */
export const initRace = async function() {

    await updateRaceFeaturesSection();

    const select = document.getElementById("race_s");

    select.value = getPlayerCharacterProperty("race");
    select.onchange = async function() {
        setPlayerCharacterProperty("race", this.value);
        await updateSubraceSelection();
        setPlayerCharacterProperty("subrace", null);
        await updateRaceFeaturesSection();
        await updateSubraceFeaturesSection();
    }
}

export const initSubRace = async function() {
    await updateSubraceSelection();
    await updateSubraceFeaturesSection();

    const select = document.getElementById("subrace_s");

    select.value = getPlayerCharacterProperty("subrace");
    select.onchange = async function() {
        setPlayerCharacterProperty("subrace", this.value);
        await updateSubraceFeaturesSection();
    }
}

const updateSubraceSelection = async function() {

    const select = document.getElementById("subrace_s");
    select.replaceChildren();

    select.appendChild(getEmptyOption());

    const raceIndex = getPlayerCharacterProperty("race")
    if (!raceIndex) {
        return;
    }

    const race = await getApiResultsAsync(ApiCategory.Races, raceIndex);

    race.subraces.forEach(subrace => {
        select.appendChild(getSelectOption(subrace.name, subrace.index));
    });
}

const updateRaceFeaturesSection = async function() {

    const raceIndex = getPlayerCharacterProperty("race")

    if (!raceIndex) {
        return;
    }

    const race = await getApiResultsAsync(ApiCategory.Races, raceIndex);

    setRaceFeaturesProperty(race, "name");
    setRaceFeaturesAbilityBonuses(race);
    setRaceFeaturesProperty(race, "speed");
    setRaceFeaturesProperty(race, "alignment");
    setRaceFeaturesProperty(race, "age");
    setRaceFeaturesSize(race);
    setRaceFeaturesLanguages(race);
    await setRaceFeaturesTraits(race);
}

const updateSubraceFeaturesSection = async function() {

    const subRaceIndex = getPlayerCharacterProperty("subrace");
    const section = document.getElementById('subrace-features');

    if (!subRaceIndex) {
        section.style.display = "none";
        return;
    }
    
    section.style.display = "block";

    const subrace = await getApiResultsAsync(ApiCategory.Subraces, subRaceIndex);

    setSubraceFeaturesProperty(subrace, "name");
    setSubraceDescriptionProperty(subrace);
    setSubraceFeaturesAbilityBonuses(subrace);
    setSubraceFeaturesTraits(subrace);
}

const setRaceFeaturesProperty = function(race, propertyName) {
    const p = document.getElementById(`race_${propertyName}`);

    p.textContent = race[propertyName];
}

const setSubraceFeaturesProperty = function(subrace, propertyName) {
    const p = document.getElementById(`subrace_${propertyName}`);

    p.textContent = subrace[propertyName];
}

const setSubraceDescriptionProperty = function(subrace) {
    const p = document.getElementById("subrace_description");

    p.textContent = subrace.desc;
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

const setSubraceFeaturesAbilityBonuses = function(subrace) {
    const ul = document.getElementById("subrace_ability_bonuses");
    ul.replaceChildren();

    for (const abilityBonus of subrace.ability_bonuses) {
        const li = document.createElement('li');

        li.textContent = `${abilityBonus.ability_score.name} + ${abilityBonus.bonus}`;

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

const setSubraceFeaturesTraits = async function(subrace) {
    const div = document.getElementById("subrace_traits");
    div.replaceChildren();

    for (const traitInfo of subrace.racial_traits) {
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