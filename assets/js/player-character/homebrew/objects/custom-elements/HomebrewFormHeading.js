import { ApiCategory } from "../../../api.js";
import { globals } from "../../../load-globals.js";

export class HomebrewFormHeading extends HTMLHeadingElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.textContent = `Custom ${new ApiCategory(globals.activeHomebrewEntry.apiCategoryName).getSingularName()}`;
    }
}

customElements.define('homebrew-object-form-heading', HomebrewFormHeading, { extends: 'h2' });