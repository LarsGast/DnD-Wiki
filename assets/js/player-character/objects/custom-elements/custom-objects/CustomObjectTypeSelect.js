import { ApiCategory } from "../../../api.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";

export class CustomObjectTypeSelect extends HTMLSelectElement {

    /**
     *
     */
    constructor() {
        super();
        
        this.appendChild(this.getAllOptions());
        this.onchange = () => this.handleChange();
    }

    handleChange() {
        document.dispatchEvent(new CustomEvent("customElementTypeChanged", {
            detail: { 
                apiCategoryName: this.value 
            },
            bubbles: true
        }));
    }

    getAllOptions() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(getEmptyOption("-- Select a type --"));
        fragment.appendChild(this.getTypeSelectOptions());

        return fragment;
    }

    getTypeSelectOptions() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(this.getTypeSelectOption(ApiCategory.Races));

        return fragment;
    }

    /**
     * 
     * @param {ApiCategory} apiCategory 
     */
    getTypeSelectOption(apiCategory) {
        return getSelectOption(apiCategory.getSingularName(), apiCategory.name);
    }
}

customElements.define('custom-object-type-select', CustomObjectTypeSelect, { extends: 'select' });