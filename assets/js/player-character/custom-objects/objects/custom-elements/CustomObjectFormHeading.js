import { ApiCategory } from "../../../api.js";
import { globals } from "../../../load-globals.js";

export class CustomObjectFormHeading extends HTMLHeadingElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.textContent = `Custom ${new ApiCategory(globals.activeCustomObjectEntry.apiCategoryName).getSingularName()}`;
    }
}

customElements.define('custom-object-form-heading', CustomObjectFormHeading, { extends: 'h2' });