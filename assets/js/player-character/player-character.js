import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../local-storage-util.js";
import { getAllRaceNamesAsync } from "./api.js";
import { changeAbilityScore, isProficientInSkill, isExpertInSkill, changeProficiency, changeExpertise, getSkillModifier, getAbilityScoreModifier } from "./util.js";

/**
 * Initialize all elements on the PC builder page.
 */
export const initPage = async function() {
    await initMainProperties();
    initAbilityScores();
    initSkills();
}

/**
 * Initialize all elements for the main properties on the PC builder page.
 */
const initMainProperties = async function() {
    initName();

    await initRace();
}

/**
 * Initialize the name input field of the PC.
 */
const initName = function() {
    const nameInput = document.getElementById('name_i');

    nameInput.value = getPlayerCharacterProperty("name");
    nameInput.onchange = function() {
        setPlayerCharacterProperty("name", this.value);
    };
}

/**
 * Initialize the race select element.
 */
const initRace = async function() {
    const allRaceNames = await getAllRaceNamesAsync();

    const select = document.getElementById("race_s");

    select.appendChild(getEmptyOption());

    allRaceNames.forEach(raceName => {
        select.appendChild(getSelectOption(raceName));
    })
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

/**
 * Initialize all elements for the ability scores on the PC builder page.
 */
const initAbilityScores = function() {
    const abilityScoresList = document.getElementById('ability-scores-list'); 
    const abilityScoreItems = Array.from(abilityScoresList.children);
    abilityScoreItems.forEach(abilityScoreItem => {
        initAbilityScoreItem(abilityScoreItem);
    });
}

/**
 * Initialize a single li ability score element.
 * @param {HTMLLIElement} abilityScoreItem 
 */
const initAbilityScoreItem = function(abilityScoreItem) {

    const abilityName = abilityScoreItem.id;

    initAbilityScoreInputField(abilityName);
    initAbilityScoreModifierSpan(abilityName);
}

/**
 * Initialize the input field of the given ability.
 * @param {string} abilityName 
 */
const initAbilityScoreInputField = function(abilityName) {

    const inputField = document.getElementById(`${abilityName}_i`);

    inputField.value = getPlayerCharacterProperty(abilityName);
    inputField.onchange = function() {
        changeAbilityScore(abilityName, this.value);
    };
}

/**
 * Initialize the ability score modifier span.
 * @param {string} abilityName 
 */
const initAbilityScoreModifierSpan = function(abilityName) {

    const span = document.getElementById(`${abilityName}_m`);

    span.textContent = getAbilityScoreModifier(abilityName);
}

/**
 * Initialize all elements for the skills on the PC builder page.
 */
const initSkills = function() {
    const skillsList = document.getElementById('skills-list');
    const skillsListItems = Array.from(skillsList.children);
    skillsListItems.forEach(skillListItem => {
        initSkillListItem(skillListItem);
    });
}

/**
 * Initialize a single li skill element.
 * @param {HTMLLIElement} skillListItem 
 */
const initSkillListItem = function(skillListItem) {

    const skill = window.skills.filter(skill => skill.name === skillListItem.id)[0];

    initProficiencyCheckbox(skill);
    initExpertiseCheckbox(skill);
    initSkillModifierSpan(skill);
}

/**
 * Initialize the proficiency checkbox of a skill item.
 * @param {object} skill 
 */
const initProficiencyCheckbox = function(skill) {

    const proficiencyCheckbox = document.getElementById(`${skill.name}_p`);

    proficiencyCheckbox.checked = isProficientInSkill(skill.name);
    proficiencyCheckbox.disabled = isExpertInSkill(skill.name);
    proficiencyCheckbox.onchange = function () {
        changeProficiency(skill, this.checked);
    };
}

/**
 * Initialize the expertise checkbox of a skill item.
 * @param {object} skill 
 */
const initExpertiseCheckbox = function(skill) {

    const expertiseCheckbox = document.getElementById(`${skill.name}_e`);
    
    expertiseCheckbox.checked = isExpertInSkill(skill.name);
    expertiseCheckbox.disabled = !isProficientInSkill(skill.name);
    expertiseCheckbox.onchange = function () {
        changeExpertise(skill, this.checked);
    };
}

/**
 * Initialize the modifier span of a skill item.
 * @param {object} skill 
 */
const initSkillModifierSpan = function(skill) {

    const skillModifierSpan = document.getElementById(`${skill.name}_m`);

    skillModifierSpan.textContent = getSkillModifier(skill);
}