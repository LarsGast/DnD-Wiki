import {getAbilityScoreModifier, getProficiencyModifier, getAbbreviationOfAbility} from './util.js';

/**
 * Fills the skills div on a player character page.
 */
export const fillSkillsDiv = function() {
    const containerDiv = document.getElementById('skills-container');
    
    const elements = getSkillsSectionElements();

    elements.forEach(function(element) {
        containerDiv.appendChild(element);
    });
}

/**
 * Gets all elements that should be put in the skills section on a PC page.
 * @returns {HTMLElement[]}
 */
const getSkillsSectionElements = function() {
    return [
        getHeadingElement(),
        getSkillsList()
    ];
}

/**
 * Gets the heading (h2) element for the skills section.
 * @returns {HTMLHeadingElement}
 */
const getHeadingElement = function() {
    const h2 = document.createElement('h2');
    h2.textContent = "Skills";

    return h2;
}

/**
 * Gets the list (ul) containing all skills of the PC.
 * @returns {HTMLUListElement}
 */
const getSkillsList = function() {
    const skills = window.skills;

    const ul = document.createElement('ul');

    ul.classList.add('no-style-list');

    skills.forEach(skill => {
        ul.appendChild(getSkillsListItem(skill));
    })

    return ul;
}

/**
 * Gets the list item (li) element for a single skill of a PC.
 * @param {{name: string, abilityName: string}} skill
 * @returns {HTMLLIElement}
 */
const getSkillsListItem = function(skill) {

    const playerCharacterObject = window.currentObject;

    const li = document.createElement('li');

    li.textContent = `${getSkillModifier(skill, playerCharacterObject)} ${skill.name} (${getAbbreviationOfAbility(skill.abilityName)})`;

    const classes = getClassList(skill.name, playerCharacterObject);
    classes.forEach(className => {
        li.classList.add(className);
    });

    return li;
}

const getClassList = function(skillName, playerCharacterObject) {
    const classList = [];

    if (getIsProficientInSkill(skillName, playerCharacterObject)) {
        classList.push('proficient');
    }

    return classList;
}

/**
 * Get the modifier for the given skill of the player character.
 * @param {{name: string, abilityName: string}} skill
 * @returns {number}
 */
const getSkillModifier = function(skill, playerCharacterObject) {

    let modifier = getAbilityScoreModifier(playerCharacterObject[skill.abilityName]) + getSkillProficiencyModifier(skill.name, playerCharacterObject);

    return modifier;
}

/**
 * Gets the proficiency modifier for the given skill.
 * @param {string} skillName 
 * @param {object} playerCharacterObject 
 * @returns {number} 0 if the PC is not proficient in the skill.
 */
const getSkillProficiencyModifier = function(skillName, playerCharacterObject) {
    if (getIsProficientInSkill(skillName, playerCharacterObject)) {
        return getProficiencyModifier(playerCharacterObject.levels);
    }

    return 0;
}

/**
 * Checks if the PC is proficient in the given skill
 * @param {string} skillName 
 * @param {object} playerCharacterObject 
 * @returns {boolean}
 */
const getIsProficientInSkill = function(skillName, playerCharacterObject) {
    return playerCharacterObject.proficiencies.includes(skillName);
}