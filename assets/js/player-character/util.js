import { getPlayerCharacterProperty, setPlayerCharacterProperty } from '../local-storage-util.js';

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

    const totalLevel = classes.map(classObject => classObject.level).reduce((partialSum, level) => partialSum + level, 0);
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
 * @param {object} skill.
 * @param {boolean} add Wether the proficiency is added or removed.
 */
export const changeProficiency = function(skill, add) {
    saveNewProficiencies(skill.name, add);
    enableOrDisableExpertise(skill.name);
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
 * Enable or disable the expertise checkbox for the given skill based on proficiency.
 * @param {string} skillName Name of the skill.
 */
const enableOrDisableExpertise = function(skillName) {
    const expertiseCheckbox = document.getElementById(`${skillName}_e`);

    if (isProficientInSkill(skillName)) {
        expertiseCheckbox.disabled = false;
    }
    else {
        expertiseCheckbox.disabled = true;
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