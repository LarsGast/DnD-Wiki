import {getAbilityScoreModifier, getProficiencyModifier, getAbbreviationOfAbility} from './util.js';
import {getPlayerCharacterProperty} from '../local-storage-util.js';

export const fillSkillsList = function(skills) {
    const ul = document.getElementById("skills-list");

    skills.forEach(skill => {
        ul.appendChild(getSkillListItem(skill));
    })
}

/**
 * Get the li element for the given skill.
 * @param {*} skill 
 * @returns {HTMLLIElement}
 */
const getSkillListItem = function(skill) {

    const li = document.createElement('li');

    const proficiencyCheckbox = getProficiencyCheckbox(skill);
    const expertiseCheckbox = getExpertiseCheckbox(skill);
    const label = getSkillLabel(skill);

    li.appendChild(proficiencyCheckbox);
    li.appendChild(expertiseCheckbox);
    li.appendChild(label);

    return li;
}

/**
 * Get the proficiency checkbox element for the given skill 
 * @param {*} skill 
 * @returns {HTMLInputElement}
 */
const getProficiencyCheckbox = function(skill) {
    const proficiencyCheckbox = document.createElement('input');
    proficiencyCheckbox.type = "checkbox";
    proficiencyCheckbox.id = `${skill.name}_p`;

    return proficiencyCheckbox;
}

/**
 * Get the expertise checkbox element for the given skill 
 * @param {*} skill 
 * @returns {HTMLInputElement}
 */
const getExpertiseCheckbox = function(skill) {
    const expertiseCheckbox = document.createElement('input');
    expertiseCheckbox.type = "checkbox";
    expertiseCheckbox.id = `${skill.name}_p`;
    return expertiseCheckbox;
}

/**
 * Get the label element for the given skill 
 * @param {*} skill 
 * @returns {HTMLInputElement}
 */
const getSkillLabel = function(skill) {
    const label = document.createElement('label');
    label.textContent = `${getSkillModifier(skill)} ${skill.name} (${getAbbreviationOfAbility(skill.abilityName)})`;

    return label;
}

/**
 * Get the modifier of the given skill for the PC in local storage.
 * @param {*} skill 
 * @returns {number}
 */
const getSkillModifier = function(skill) {

    const scoreModifier = getAbilityScoreModifier(skill.abilityName);
    const proficiencyModifier = getProficiencyModifier();

    let skillModifier = scoreModifier;
    if (isProficientInSkill(skill.name)){
        skillModifier + proficiencyModifier;
    }
    
    if (isExpertInSkill(skill.name)){
        skillModifier + proficiencyModifier;
    }

    return skillModifier;
}

/**
 * Check if the PC is proficient in the given skill.
 * @param {string} skillName 
 * @returns 
 */
const isProficientInSkill = function(skillName) {
    const proficiencies = getPlayerCharacterProperty("proficiencies");
    return proficiencies.includes(skillName);
}


/**
 * Check if the PC has expertise in the given skill.
 * @param {string} skillName 
 * @returns 
 */
const isExpertInSkill = function(skillName) {
    const expertises = getPlayerCharacterProperty("expertises");
    return expertises.includes(skillName);
}