import { ApiCategory } from "../../../api.js";
import { globals } from "../../../load-page.js";
import { getSelectOption } from "../../../util.js";
import { ApiObjectInfo } from "../../api/resources/ApiObjectInfo.js";

export class CustomObjectForm extends HTMLFormElement {

    /**
     *
     */
    constructor() {
        super();
        
        /** @type {ApiObjectInfo} */
        this.customObject = this.getCustomObject();
        this.appendChild(this.getFormBody());
    }

    /**
     * 
     * @returns {ApiObjectInfo}
     */
    getCustomObject() {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        const customObjectEntry = globals.customObjectBank.getCustomObjectBankEntryByIndex(id);

        return customObjectEntry.customObject;
    }

    
    /**
     * 
     * @returns {DocumentFragment}
     */
    getFormBody() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(this.getNameInputSection());
        fragment.appendChild(this.getTypeSelectSection());

        return fragment;
    }

    getNameInputSection() {
        return this.getInputSection("Name", 'name', this.customObject.name);
    }

    getTypeSelectSection() {
        const label = document.createElement('label');
        label.textContent = "Type";

        const select = document.createElement('select');
        select.value = this.customObject.apiCategory?.name;
        select.appendChild(this.getTypeSelectOptions());

        const fragment = document.createDocumentFragment();

        fragment.appendChild(label);
        fragment.appendChild(select);

        return fragment;
    }

    getTypeSelectOptions() {
        const fragment = document.createDocumentFragment();

        fragment.appendChild(this.getTypeSelectOption(ApiCategory.Classes));
        fragment.appendChild(this.getTypeSelectOption(ApiCategory.Races));

        return fragment;
    }

    /**
     * 
     * @param {ApiCategory} apiCategory 
     */
    getTypeSelectOption(apiCategory) {
        return getSelectOption(apiCategory.displayName, apiCategory.name);
    }

    getInputSection(labelText, id, defaultValue) {
        const label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = `custom-object-${id}`;

        const input = document.createElement('input');
        input.id = `custom-object-${id}`;
        input.value = defaultValue;

        const fragment = document.createDocumentFragment();

        fragment.appendChild(label);
        fragment.appendChild(input);

        return fragment;
    }

}

customElements.define('custom-object-form', CustomObjectForm, { extends: 'form' });