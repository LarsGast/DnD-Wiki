/**
 * Custom HTML element for displaying and handling the button to open the CustomObject Import Dialog.
 * Extends HTMLButtonElement.
 */
export class CustomObjectImportButton extends HTMLButtonElement {
    
    constructor(customObjectId) {
        super();
        
        // Set type and text.
        this.customObjectId = customObjectId;
        this.type = 'button';
        this.textContent = "Import";

        // Bind click event to trigger the import dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "customObjectImportButtonClicked" event.
     */
    handleClick() {
        document.dispatchEvent(new Event("customObjectImportButtonClicked"));
    }
}

customElements.define('custom-object-import-button', CustomObjectImportButton, { extends: 'button' });