import { globalPlayerCharacter } from "../../objects/PlayerCharacter.js";
import { ClassLevelInput } from "../../objects/custom-elements/generic-info/ClassLevelInput.js";

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