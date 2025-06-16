import { globals } from "../../../load-page.js";
import { ApiObjectInfo } from "../../api/resources/ApiObjectInfo.js";

export class NewCustomObjectButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        // Set type and display text.
        this.disabled = true;
        this.type = 'button';
        this.textContent = "New";

        // Bind click event to add a default object to the bank.
        this.onclick = () => this.handleClick();
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for the "customElementTypeChanged" event to show the dialog.
     */
    connectedCallback() {
        this._updateHandler = (event) => this.updateButtonData(event);
        document.addEventListener("customElementTypeChanged", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listener.
     */
    disconnectedCallback() {
        document.removeEventListener("customElementTypeChanged", this._updateHandler);
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    updateButtonData(event) {
        /** @type {string} */
        this.apiCategoryName = event.detail.apiCategoryName;

        this.disabled = false;
    }
    
    /**
     * Handles the button click.
     */
    handleClick() {
        globals.customObjectBank.addNewCustomObject(ApiObjectInfo.getDefault(), this.apiCategoryName);
        globals.customObjectBank.save();

        document.dispatchEvent(new Event("newCustomObjectCreated"));
    }
}

customElements.define('new-custom-object-button', NewCustomObjectButton, { extends: 'button' });