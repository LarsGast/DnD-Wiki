import {getAbilityScoreModifier, getProficiencyModifier, getAbbreviationOfAbility, changeProficiency} from './util.js';
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

    const proficiencyCheckbox = getProficiencyCheckbox(skill.name);
    const expertiseCheckbox = getExpertiseCheckbox(skill.name);
    const label = getSkillLabel(skill);

    li.appendChild(proficiencyCheckbox);
    li.appendChild(expertiseCheckbox);
    li.appendChild(label);

    return li;
}

/**
 * Get the proficiency checkbox element for the given skill 
 * @param {string} skillName 
 * @returns {HTMLInputElement}
 */
const getProficiencyCheckbox = function(skillName) {
    const proficiencyCheckbox = document.createElement('input');

    proficiencyCheckbox.type = "checkbox";
    proficiencyCheckbox.id = `${skillName}_p`;
    proficiencyCheckbox.checked = isProficientInSkill(skillName);
    proficiencyCheckbox.onchange = function () {
        changeProficiency(skillName, this.checked);
    };

    return proficiencyCheckbox;
}

/**
 * Get the expertise checkbox element for the given skill 
 * @param {string} skillName 
 * @returns {HTMLInputElement}
 */
const getExpertiseCheckbox = function(skillName) {
    const expertiseCheckbox = document.createElement('input');

    expertiseCheckbox.type = "checkbox";
    expertiseCheckbox.id = `${skillName}_e`;
    expertiseCheckbox.checked = isExpertInSkill(skillName);
    expertiseCheckbox.disabled = !isProficientInSkill(skillName);

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