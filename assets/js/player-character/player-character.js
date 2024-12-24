import { getPlayerCharacterProperty } from "../local-storage-util.js";
import { isProficientInSkill, isExpertInSkill, changeProficiency, changeExpertise, getSkillModifier } from "./util.js";

/**
 * Initialize all elements on the PC builder page.
 */
export const initPage = function() {
    initMainProperties();
    initAbilityScores();
    initSkills();
}

/**
 * Initialize all elements for the main properties on the PC builder page.
 */
const initMainProperties = function() {

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
}

const initAbilityScoreInputField = function(abilityName) {

    const inputField = document.getElementById(`${abilityName}_i`);

    inputField.value = getPlayerCharacterProperty(abilityName);
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