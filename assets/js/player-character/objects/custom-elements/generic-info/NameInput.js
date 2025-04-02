import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class NameInput extends HTMLInputElement {
    /**
     *
     */
    constructor() {
        super();

        this.type = 'text';
        this.value = globalPlayerCharacter.name;

        this.onchange = () => this.handleChange();
    }

    handleChange() {
        
        globalPlayerCharacter.setProperty('name', this.value);

        document.dispatchEvent(new Event("nameChanged"));
    }
}

customElements.define("name-input", NameInput, { extends: 'input' });