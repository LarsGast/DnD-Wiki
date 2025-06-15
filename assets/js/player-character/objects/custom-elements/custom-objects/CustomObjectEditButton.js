/**
 * Custom HTML element for displaying and handling the button to open the CustomObject Edit Dialog.
 * Extends HTMLButtonElement.
 */
export class CustomObjectEditButton extends HTMLButtonElement {
    
    constructor(customObjectId) {
        super();
        
        // Set type and text.
        this.customObjectId = customObjectId;
        this.type = 'button';
        this.textContent = "Edit";

        // Bind click event to trigger the edit dialog.
        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click and dispatches a "customObjectEditButtonClicked" event.
     */
    handleClick() {
        window.location.href = `/pc-builder/custom-object/?id=${this.customObjectId}`;
    }
}

customElements.define('custom-object-edit-button', CustomObjectEditButton, { extends: 'button' });