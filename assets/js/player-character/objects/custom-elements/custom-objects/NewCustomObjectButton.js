import { globals } from "../../../load-page.js";
import { ApiObjectInfo } from "../../api/resources/ApiObjectInfo.js";
import { CustomObjectBank } from "../../CustomObjectBank.js"

export class NewCustomObjectButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set type and display text.
        this.type = 'button';
        this.textContent = "New";

        // Bind click event to add a default object to the bank.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click.
     */
    handleClick() {
        globals.customObjectBank.addNewCustomObject(ApiObjectInfo.getDefault());
        globals.customObjectBank.save();

        document.dispatchEvent(new Event("newCustomObjectCreated"));
    }
}

customElements.define('new-custom-object-button', NewCustomObjectButton, { extends: 'button' });