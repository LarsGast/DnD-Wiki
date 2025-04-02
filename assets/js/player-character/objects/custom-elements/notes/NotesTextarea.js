import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class NotesTextarea extends HTMLTextAreaElement {
    /**
     *
     */
    constructor() {
        super();

        this.value = globalPlayerCharacter.notes;

        this.onchange = () => this.handleChange();
    }

    handleChange() {
        
        globalPlayerCharacter.setProperty('notes', this.value);

        document.dispatchEvent(new Event("notesChanged"));
    }
}

customElements.define("notes-textarea", NotesTextarea, { extends: 'textarea' });