import {getAbbreviationOfAbility} from './util.js';

export const fillSkillsList = function(skills) {
    const ul = document.getElementById("skills-list");

    skills.forEach(skill => {
        ul.appendChild(getSkillListItem(skill));
    })
}

const getSkillListItem = function(skill) {

    const li = document.createElement('li');

    const proficiencyCheckbox = document.createElement('input');
    proficiencyCheckbox.type = "checkbox";
    proficiencyCheckbox.id = `${skill.name}_p`;

    const expertiseCheckbox = document.createElement('input');
    expertiseCheckbox.type = "checkbox";
    expertiseCheckbox.id = `${skill.name}_e`;

    const label = document.createElement('label');
    label.textContent = `${getSkillModifier()} ${skill.name} (${getAbbreviationOfAbility(skill.abilityName)})`;

    li.appendChild(proficiencyCheckbox);
    li.appendChild(expertiseCheckbox);
    li.appendChild(label);

    return li;
}

const getSkillModifier = function() {
    return 0;
}