/**
 * Custom HTML element for displaying and handling the button to open the CustomObject Export Dialog.
 * Extends HTMLButtonElement.
 */
export class CustomObjectExportButton extends HTMLButtonElement {
    
    constructor(customObjectId) {
        super();
        
        // Set type and text.
        this.customObjectId = customObjectId;
        this.type = 'button';
        this.textContent = "Export";

        // Bind click event to trigger the export dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "customObjectExportButtonClicked" event.
     */
    handleClick() {
        document.dispatchEvent(new CustomEvent("customObjectExportButtonClicked", {
            detail: { 
                customObjectId: this.customObjectId 
            },
            bubbles: true
        }));
    }
}

customElements.define('custom-object-export-button', CustomObjectExportButton, { extends: 'button' });