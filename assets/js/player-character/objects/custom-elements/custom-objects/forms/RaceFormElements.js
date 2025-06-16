import { Race } from "../../../api/resources/Race.js";

export class RaceFormElements extends HTMLElement {
    /**
     *
     */
    constructor(raceElement) {
        super();
        
        /** @type {Race} */
        this.race = raceElement;

        this.appendChild(this.getFormBody());
    }

    getFormBody() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(this.getInput("Speed", 'speed', this.race.speed, true));
        fragment.appendChild(this.getInput("Age", 'age', this.race.age, false));
        fragment.appendChild(this.getInput("Alignment", 'alignment', this.race.alignment, false));
        fragment.appendChild(this.getInput("Size", 'size', this.race.size, false));
        fragment.appendChild(this.getInput("Size description", 'size-description', this.race.size_description, false));
        fragment.appendChild(this.getInput("Language description", 'language-description', this.race.language_desc, false));

        return fragment;
    }

    getInput(labelText, id, defaultValue, isNumberInput) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const input = document.createElement('input');
        input.id = `custom-object-${id}`;
        input.value = defaultValue ?? '';
        input.type = isNumberInput ? 'number' : null;

        const fragment = document.createDocumentFragment();

        fragment.appendChild(label);
        fragment.appendChild(input);

        return fragment;
    }
}

customElements.define('race-form-elements', RaceFormElements);