import { globalPlayerCharacter } from "../../objects/PlayerCharacter.js";
import { getEmptyOption, getSelectOption, limitClassLevel, updateAllSkillModifiers, updateClasses } from "../../util.js";
import { updateAllWeaponModifiers } from "../inventory/init-weapons.js";
import { Class } from "../../objects/api/resources/Class.js";
import { ClassLevelInput } from "../../objects/ClassLevelInput.js";

/**
 * Init the class and level property.
 */
export const initClassAndLevel = function() {
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
        const li = document.createElement('li');
        li.appendChild(new ClassLevelInput());
        classList.appendChild(li);
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
    const allClasses = await Class.getAllAsync();

    const select = document.createElement('select');

    select.appendChild(getEmptyOption());

    allClasses.results.forEach(classObject => {
        select.appendChild(getSelectOption(classObject.name, classObject.index));
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

    button.onclick = async function() {
        const parent = this.parentElement;
        parent.remove();

        changeClassSelect();
        await changeLevelInput();
    }

    return button;
}

/**
 * Build the class selection section to include local storage.
 */
const initClassSelection = function() {
    const classes = globalPlayerCharacter.classes;
    const addClassButton = document.getElementById('class-and-level_b');

    if (classes.length === 0){
        addClassButton.onclick();
        return;
    }

    const classList = document.getElementById('class-and-level-list');

    classes.forEach(async classObject => {
        const li = document.createElement('li');

        const classLevelInput = new ClassLevelInput(classObject.index, classObject.level);

        li.appendChild(classLevelInput);

        classList.appendChild(li);
    });
}

/**
 * Handle the change of a class select element.
 */
const changeClassSelect = function() {
    updateClasses();
}

/**
 * Handle the change of a class level input.
 */
const changeLevelInput = async function() {
    limitClassLevel();
    updateClasses();
    await updateAllSkillModifiers();
    updateAllWeaponModifiers();
}