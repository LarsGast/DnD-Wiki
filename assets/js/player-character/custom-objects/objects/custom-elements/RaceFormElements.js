import { Race } from "../../../objects/api/resources/Race.js";

export class CustomRaceForm extends HTMLFormElement {
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

        fragment.appendChild(this.getInput("Name", 'name', this.race.name, false));
        fragment.appendChild(this.getInput("Speed", 'speed', this.race.speed, true));
        fragment.appendChild(this.getTextarea("Age", 'age', this.race.age));
        fragment.appendChild(this.getTextarea("Alignment", 'alignment', this.race.alignment));
        fragment.appendChild(this.getInput("Size", 'size', this.race.size, false));
        fragment.appendChild(this.getTextarea("Size description", 'size-description', this.race.size_description));
        fragment.appendChild(this.getTextarea("Language description", 'language-description', this.race.language_desc));

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

    getTextarea(labelText, id, defaultValue) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const textArea = document.createElement('textarea');
        textArea.id = `custom-object-${id}`;
        textArea.value = defaultValue ?? '';

        const fragment = document.createDocumentFragment();

        fragment.appendChild(label);
        fragment.appendChild(textArea);

        return fragment;
    }
}

customElements.define('custom-race-form', CustomRaceForm, { extends: 'form' });