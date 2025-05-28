/**
 * Custom HTML element for displaying and handling the button to open the CustomObject Delete Dialog.
 * Extends HTMLButtonElement.
 */
export class CustomObjectDeleteButton extends HTMLButtonElement {
    
    constructor(customObjectId) {
        super();
        
        // Set type and text.
        this.customObjectId = customObjectId;
        this.type = 'button';
        this.textContent = "Delete";

        // Bind click event to trigger the delete dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "customObjectDeleteButtonClicked" event.
     */
    handleClick() {
        document.dispatchEvent(new CustomEvent("customObjectDeleteButtonClicked", {
            detail: { 
                customObjectId: this.customObjectId 
            },
            bubbles: true
        }));
    }
}

customElements.define('custom-object-delete-button', CustomObjectDeleteButton, { extends: 'button' });