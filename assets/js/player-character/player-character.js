import { getPlayerCharacterProperty, setPlayerCharacterProperty } from "../local-storage-util.js";
import { getAllClassNamesAsync } from "./api.js";
import { changeClassSelect, changeAbilityScore, isProficientInSkill, isExpertInSkill, changeProficiency, changeExpertise, getSkillModifier, getAbilityScoreModifier, getEmptyOption, getSelectOption, changeLevelInput } from "./util.js";

/**
 * Initialize all elements on the PC builder page.
 */
export const initPage = function() {
    initMainProperties();
    initAbilityScores();
    initSkills();
    initNotes();
}

/**
 * Initialize all elements for the main properties on the PC builder page.
 */
const initMainProperties = function() {
    initName();
    initClassAndLevel();
    initRace();
    initBackground();
    initAlignment();
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
 * Init the class and level property.
 */
const initClassAndLevel = function() {
    initAddClassButton();
    initClassSelection();
}

/**
 * Init the "Add class" button.
 */
const initAddClassButton = function() {

    const button = document.getElementById('class-and-level_b');

    button.onclick = async function() {
        const classList = document.getElementById('class-and-level-list');

        classList.appendChild(await getClassListItem());

        changeClassSelect();
        changeLevelInput()
    }
}

/**
 * Get an li element for the class-and-level list.
 * @returns {HTMLLIElement}
 */
const getClassListItem = async function() {
    const li = document.createElement('li');

    li.appendChild(await getClassSelect());
    li.appendChild(getClassLevelInput());
    li.appendChild(getRemoveClassButton());

    return li;
}

/**
 * Get a select element for the class-and-level list.
 * @returns {HTMLSelectElement}
 */
const getClassSelect = async function() {
    const allClassNames = await getAllClassNamesAsync();

    const select = document.createElement('select');

    select.appendChild(getEmptyOption());

    allClassNames.forEach(className => {
        select.appendChild(getSelectOption(className));
    });

    select.onchange = function() {
        changeClassSelect();
    }

    return select;
}

/**
 * Get an input element for the class-and-level list.
 * @returns {HTMLInputElement}
 */
const getClassLevelInput = function() {
    const input = document.createElement('input');

    input.type = "number";
    input.min = "1";
    input.max = "20";
    input.value = "1";

    input.onchange = function() {
        changeLevelInput();
    }

    return input;
}

/**
 * Get a button element for removing a class.
 * @returns 
 */
const getRemoveClassButton = function() {
    const button = document.createElement('button');

    button.type = "button";
    button.textContent = "Remove class";

    button.onclick = function() {
        const parent = this.parentElement;
        parent.remove();

        changeClassSelect();
        changeLevelInput();
    }

    return button;
}

/**
 * Build the class selection section to include local storage.
 */
const initClassSelection = function() {
    const classes = getPlayerCharacterProperty("classes");
    const addClassButton = document.getElementById('class-and-level_b');

    if (classes === null || classes.length === 0){
        addClassButton.onclick();
        return;
    }

    classes.forEach(async classObject => {
        
        const classList = document.getElementById('class-and-level-list');
        classList.appendChild(await getClassListItem());

        const li = classList.lastChild;

        const select = li.getElementsByTagName('select')[0];
        select.value = classObject.name;

        const input = li.getElementsByTagName('input')[0];
        input.value = classObject.level;
    });
}

/**
 * Initialize the race select element.
 */
const initRace = function() {

    const select = document.getElementById("race_s");

    select.value = getPlayerCharacterProperty("race");
    select.onchange = function() {
        setPlayerCharacterProperty("race", this.value);
    }
}

/**
 * Initialize the background select element.
 */
const initBackground = function() {

    const select = document.getElementById("background_s");

    select.value = getPlayerCharacterProperty("background");
    select.onchange = function() {
        setPlayerCharacterProperty("background", this.value);
    }
}

/**
 * Initialize the alignment select element.
 */
const initAlignment = function() {

    const select = document.getElementById("alignment_s");

    select.value = getPlayerCharacterProperty("alignment");
    select.onchange = function() {
        setPlayerCharacterProperty("alignment", this.value);
    }
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

/**
 * Initialize notes section.
 */
const initNotes = function() {
    const textArea = document.getElementById('notes');

    textArea.value = getPlayerCharacterProperty("notes") ?? '';
    textArea.onchange = function() {
        setPlayerCharacterProperty("notes", this.value);
    };
}