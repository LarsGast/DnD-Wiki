import { getPlayerCharacterProperty, setPlayerCharacterProperty } from '../local-storage-util.js';

/**
 * Handle the change of a class select element.
 */
export const changeClassSelect = function() {
    updateClasses();
}

/**
 * Handle the change of a class level input.
 */
export const changeLevelInput = function() {
    updateClasses();
    updateAllSkillModifiers();
}

/**
 * Update the classes of the PC in local storage.
 */
const updateClasses = function() {
    const classes = getClasses();
    setPlayerCharacterProperty('classes', classes);
}

/**
 * Get all selected class objects for the PC.
 * @returns {{class: string, level: number}[]}
 */
const getClasses = function() {
    const classAndLevelList = document.getElementById('class-and-level-list');
    const classAndLevelListItems = Array.from(classAndLevelList.children);

    let classes = [];
    classAndLevelListItems.forEach(li => {
        const select = li.getElementsByTagName('select')[0];
        const input = li.getElementsByTagName('input')[0];

        const classObject = {
            name: select.value,
            level: input.value
        };

        classes.push(classObject);
    })

    return classes;
}

/**
 * Get an empty option for select elements.
 * @returns {HTMLOptionElement}
 */
export const getEmptyOption = function() {

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
export const getSelectOption = function(optionValue) {
    const option = document.createElement('option');

    option.value = optionValue;
    option.textContent = optionValue;

    return option;
}

/**
 * Change the score of the given ability.
 * @param {string} abilityName 
 * @param {number} abilityScore 
 */
export const changeAbilityScore = function(abilityName, abilityScore) {
    if (abilityScore < 1 || abilityScore > 30) {
        limitAbilityScore(abilityName, abilityScore);
        return;
    }
    saveAbilityScore(abilityName, abilityScore);
    updateAbilityScoreModifier(abilityName);
    updateAllSkillModifiers();
}

/**
 * Ensure that each ability score is within 1 and 30.
 * @param {string} abilityName 
 * @param {number} abilityScore 
 */
const limitAbilityScore = function(abilityName, abilityScore) {
    const inputField = document.getElementById(`${abilityName}_i`);

    if (abilityScore > 30){
        inputField.value = 30;
    }
    else {
        inputField.value = 1;
    }
    
    inputField.onchange();
}

/**
 * Save the given score to the given ability.
 * @param {string} abilityName 
 * @param {number} abilityScore 
 */
const saveAbilityScore = function(abilityName, abilityScore) {
    setPlayerCharacterProperty(abilityName, abilityScore);
}

/**
 * Update the ability score modifier for the given ability.
 * @param {string} abilityName 
 */
const updateAbilityScoreModifier = function(abilityName) {
    const span = document.getElementById(`${abilityName}_m`);

    span.textContent = getAbilityScoreModifier(abilityName);
}

/**
 * Update all skill modifiers at once.
 */
const updateAllSkillModifiers = function() {
    window.skills.forEach(skill => {
        updateSkillModifier(skill);
    });
}

/**
 * Get the ability score modifier from an ability score.
 * @param {string} abilityName
 * @returns {number}
 */
export const getAbilityScoreModifier = function(abilityName) {

    const abilityScore = getPlayerCharacterProperty(abilityName);

    return Math.floor((abilityScore - 10) / 2);
}

/**
 * Get the proficiency modifier of a player character based on the levels of that character.
 * @returns {number}
 */
export const getProficiencyModifier = function() {

    const classes = getPlayerCharacterProperty("classes");

    if (classes == null || classes.length === 0) {
        return 0;
    }

    const totalLevel = classes.map(classObject => classObject.level).reduce((partialSum, level) => partialSum + Number(level), 0);
    return Math.ceil(totalLevel / 4) + 1;
}

/**
 * Get the abbreviated name of an ability.
 * @param {string} abilityName 
 * @returns {string} 3 letter abbreviation.
 */
export const getAbbreviationOfAbility = function(abilityName) {
    switch(abilityName){
        case 'strength':
            return 'STR';
        case 'dexterity':
            return 'DEX';
        case 'constitution':
            return 'CON';
        case 'intelligence':
            return 'INT';
        case 'wisdom':
            return 'WIS';
        case 'charisma':
            return 'CHA';
    }
}

/**
 * Check if the PC is proficient in the given skill.
 * @param {string} skillName 
 * @returns {boolean}
 */
export const isProficientInSkill = function(skillName) {
    const proficiencies = getPlayerCharacterProperty("proficiencies");
    return proficiencies.includes(skillName);
}

/**
 * Check if the PC has expertise in the given skill.
 * @param {string} skillName 
 * @returns {boolean}
 */
export const isExpertInSkill = function(skillName) {
    const expertises = getPlayerCharacterProperty("expertises");
    return expertises.includes(skillName);
}

/**
 * Get the modifier of the given skill for the PC in local storage.
 * @param {*} skill 
 * @returns {number}
 */
export const getSkillModifier = function(skill) {

    const scoreModifier = getAbilityScoreModifier(skill.abilityName);
    const proficiencyModifier = getProficiencyModifier();

    let skillModifier = scoreModifier;
    if (isProficientInSkill(skill.name)){
        skillModifier += proficiencyModifier;
    }
    
    if (isExpertInSkill(skill.name)){
        skillModifier += proficiencyModifier;
    }

    return skillModifier;
}

/**
 * Add or remove a proficiency in a skill.
 * @param {object} skill
 * @param {boolean} add Wether the proficiency is added or removed.
 */
export const changeProficiency = function(skill, add) {
    saveNewProficiencies(skill.name, add);
    enableOrDisableExpertiseCheckbox(skill.name);
    updateSkillModifier(skill);
}

/**
 * Add or remove a expertise in a skill.
 * @param {object} skill
 * @param {boolean} add Wether the expertise is added or removed.
 */
export const changeExpertise = function(skill, add) {
    saveNewExpertises(skill.name, add);
    enableOrDisableProficiencyCheckbox(skill.name);
    updateSkillModifier(skill);
}

/**
 * Save the skill proficiency to local storage.
 * @param {string} skillName Name of the skill.
 * @param {boolean} add Wether the proficiency is added or removed.
 */
const saveNewProficiencies = function(skillName, add) {
    const proficiencies = getPlayerCharacterProperty("proficiencies");

    if (add === true) {
        if (!proficiencies.includes(skillName)) {
            proficiencies.push(skillName);
        }
    }
    else {
        const skillIndex = proficiencies.indexOf(skillName);
        if (skillIndex !== -1) {
            proficiencies.splice(skillIndex, 1);
        }
    }

    setPlayerCharacterProperty("proficiencies", proficiencies);
}

/**
 * Save the skill expertise to local storage.
 * @param {string} skillName Name of the skill.
 * @param {boolean} add Wether the expertise is added or removed.
 */
const saveNewExpertises = function(skillName, add) {
    const expertise = getPlayerCharacterProperty("expertises");

    if (add === true) {
        if (!expertise.includes(skillName)) {
            expertise.push(skillName);
        }
    }
    else {
        const skillIndex = expertise.indexOf(skillName);
        if (skillIndex !== -1) {
            expertise.splice(skillIndex, 1);
        }
    }

    setPlayerCharacterProperty("expertises", expertise);
}

/**
 * Enable or disable the expertise checkbox for the given skill based on proficiency.
 * @param {string} skillName Name of the skill.
 */
const enableOrDisableExpertiseCheckbox = function(skillName) {
    const expertiseCheckbox = document.getElementById(`${skillName}_e`);

    if (isProficientInSkill(skillName)) {
        expertiseCheckbox.disabled = false;
    }
    else {
        expertiseCheckbox.disabled = true;
    }
}

/**
 * Enable or disable the proficiency checkbox for the given skill based on expertise.
 * @param {string} skillName Name of the skill.
 */
const enableOrDisableProficiencyCheckbox = function(skillName) {
    const proficiencyCheckbox = document.getElementById(`${skillName}_p`);

    if (isExpertInSkill(skillName)) {
        proficiencyCheckbox.disabled = true;
    }
    else {
        proficiencyCheckbox.disabled = false;
    }
}

/**
 * Update the modifier for the given skill.
 * @param {object} skill 
 */
const updateSkillModifier = function(skill) {
    const span = document.getElementById(`${skill.name}_m`);

    span.textContent = getSkillModifier(skill);
}