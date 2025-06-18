import { ApiCategory } from "../../../api.js";
import { globals } from "../../../load-page.js";
import { CustomObjectBankEntry } from "../../../objects/CustomObjectBank.js"

export class CustomObjectFormHeading extends HTMLHeadingElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.textContent = `Custom ${new ApiCategory(this.getCustomObject().apiCategoryName).getSingularName()}`;
    }
    
    /**
     * 
     * @returns {CustomObjectBankEntry}
     */
    getCustomObject() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        return globals.customObjectBank.getCustomObjectBankEntryByIndex(id);
    }
}

customElements.define('custom-object-form-heading', CustomObjectFormHeading, { extends: 'h2' });