import { getEmptyOption, getSelectOption } from "../../../../util.js";

export class ObjectSelect extends HTMLElement {
    /**
     *
     */
    constructor(possibleObjects, selectedObject) {
        super();
        
        /** @type {ApiObjectInfo[]} */
        this.possibleObjects = possibleObjects;

        this.appendChild(this.getSelect(selectedObject));
        this.appendChild(this.getDeleteButton());
    }

    getSelect(defaultValue) {
        const select = document.createElement('select');

        select.appendChild(getEmptyOption());

        for (const object of this.possibleObjects) {
            select.appendChild(getSelectOption(object.name, object.index));
        }

        select.value = this.selectedObject ?? null;

        return select;
    }

    getDeleteButton() {
        const button = document.createElement('button');

        button.textContent = "Remove";
        button.onclick = () => { this.remove() };

        return button;
    }
}

customElements.define('object-select', ObjectSelect);