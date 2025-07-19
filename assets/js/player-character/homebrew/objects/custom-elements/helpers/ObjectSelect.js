import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { getEmptyOption, getSelectOption } from "../../../../util.js";

export class ObjectSelect extends HTMLElement {
    
    /**
     * 
     * @param {ApiObjectInfo[]} possibleObjects 
     * @param {ApiObjectInfo} selectedObject 
     */
    constructor(possibleObjects, selectedObject) {
        super();
        
        /** @type {ApiObjectInfo[]} */
        this.possibleObjects = possibleObjects;

        this.select = this.getSelect(selectedObject);
        this.deleteButton = this.getDeleteButton();

        this.appendChild(this.select);
        this.appendChild(this.deleteButton);
    }

    /**
     * 
     * @param {ApiObjectInfo} defaultValue 
     * @returns 
     */
    getSelect(defaultValue) {
        const select = document.createElement('select');

        select.appendChild(getEmptyOption());

        for (const object of this.possibleObjects) {
            select.appendChild(getSelectOption(object.name, object.index));
        }

        select.value = defaultValue?.index ?? null;

        return select;
    }

    getDeleteButton() {
        const button = document.createElement('button');

        button.textContent = "Remove";
        button.onclick = () => { this.remove() };

        return button;
    }

    /**
     * 
     * @returns {ApiObjectInfo}
     */
    getValue() {
        const data = new ApiObjectInfo();

        data.index = this.select.value;
        data.name = this.select.options[this.select.selectedIndex].text;

        return data;
    }
}

customElements.define('object-select', ObjectSelect);