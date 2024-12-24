import {getAbbreviationOfAbility, isProficientInSkill, isExpertInSkill, getSkillModifier, changeProficiency, changeExpertise} from './util.js';

export const fillSkillsList = function(skills) {
    const ul = document.getElementById("skills-list");

    skills.forEach(skill => {
        ul.appendChild(getSkillListItem(skill));
    })
}

/**
 * Get the li element for the given skill.
 * @param {object} skill 
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
 * Get the proficiency checkbox element for the given skill.
 * @param {object} skill 
 * @returns {HTMLInputElement}
 */
const getProficiencyCheckbox = function(skill) {
    const proficiencyCheckbox = document.createElement('input');

    proficiencyCheckbox.type = "checkbox";
    proficiencyCheckbox.id = `${skill.name}_p`;
    proficiencyCheckbox.checked = isProficientInSkill(skill.name);
    proficiencyCheckbox.onchange = function () {
        changeProficiency(skill, this.checked);
    };

    return proficiencyCheckbox;
}

/**
 * Get the expertise checkbox element for the given skill.
 * @param {object} skill 
 * @returns {HTMLInputElement}
 */
const getExpertiseCheckbox = function(skill) {
    const expertiseCheckbox = document.createElement('input');

    expertiseCheckbox.type = "checkbox";
    expertiseCheckbox.id = `${skill.name}_e`;
    expertiseCheckbox.checked = isExpertInSkill(skill.name);
    expertiseCheckbox.disabled = !isProficientInSkill(skill.name);
    expertiseCheckbox.onchange = function () {
        changeExpertise(skill, this.checked);
    };

    return expertiseCheckbox;
}

/**
 * Get the label element for the given skill.
 * @param {object} skill 
 * @returns {HTMLInputElement}
 */
const getSkillLabel = function(skill) {
    const label = document.createElement('label');
    
    const modifierSpan = getModifierSpan(skill);
    const skillNameSpan = getSkillNameSpan(skill);

    label.appendChild(modifierSpan);
    label.appendChild(skillNameSpan);

    return label;
}

/**
 * Get the span element for the modifier number.
 * @param {object} skill 
 * @returns {HTMLSpanElement}
 */
const getModifierSpan = function(skill) {
    const span = document.createElement('span');
    
    span.textContent = getSkillModifier(skill);
    span.id = `${skill.name}_m`;

    return span;
}

/**
 * Get the span element for the skill label name.
 * @param {object} skill 
 * @returns {HTMLSpanElement}
 */
const getSkillNameSpan = function(skill) {
    const span = document.createElement('span');
    
    span.textContent = ` ${skill.name} (${getAbbreviationOfAbility(skill.abilityName)})`;

    return span;
}