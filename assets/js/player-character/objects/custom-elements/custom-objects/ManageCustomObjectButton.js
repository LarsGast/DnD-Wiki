/**
 * Custom HTML element for displaying and handling the button to manage custom objects.
 * Extends HTMLButtonElement.
 */
export class ManageCustomObjectButton extends HTMLButtonElement {
    
    constructor() {
        super();
        
        this.type = 'button';
        this.textContent = "Manage custom objects";

        this.onclick = () => this.handleClick();
    }
    
    /**
     * Handles the button click.
     */
    handleClick() {
        document.dispatchEvent(new Event('manageCustomObjectsButtonClicked'));
    }
}

customElements.define('manage-custom-objects-button', ManageCustomObjectButton, { extends: 'button' });