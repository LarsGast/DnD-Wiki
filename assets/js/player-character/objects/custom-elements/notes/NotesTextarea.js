import { globals } from "../../../load-page.js";

/**
 * Custom HTML element for displaying and handling a textarea for character notes.
 * Extends HTMLTextAreaElement.
 *
 * On change, it updates the active PC's notes and dispatches an event to notify listeners.
 */
export class NotesTextarea extends HTMLTextAreaElement {
    constructor() {
        super();

        // Set initial value from the PC's notes.
        this.value = globals.activePlayerCharacter.notes;

        // Bind the onchange event to update the notes.
        this.onchange = () => this.handleChange();
    }

    /**
     * Handles changes to the textarea by updating the global notes and dispatching a "notesChanged" event.
     */
    handleChange() {
        globals.activePlayerCharacter.setProperty('notes', this.value);
        
        document.dispatchEvent(new Event("notesChanged"));
    }
}

customElements.define("notes-textarea", NotesTextarea, { extends: 'textarea' });