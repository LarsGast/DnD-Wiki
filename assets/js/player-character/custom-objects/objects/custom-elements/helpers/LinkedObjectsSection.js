import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { CustomObjectBaseForm } from "../CustomObjectBaseForm.js";
import { ObjectSelect } from "./ObjectSelect.js";

export class LinkedObjectsSection extends HTMLElement {

    /**
     * 
     * @param {string} label 
     * @param {ApiObjectInfo[]} possibleObjects 
     * @param {ApiObjectInfo[]} selectedObjects 
     */
    constructor(label, possibleObjects, selectedObjects, tooltip) {
        super();
        
        /** @type {ApiObjectInfo[]} */
        this.possibleObjects = possibleObjects;

        this.appendChild(this.getSectionLabel(label, tooltip));
        this.appendChild(this.getAddButton());

        for (const selectedObject of selectedObjects) {
            this.addObjectSelect(selectedObject);
        }
    }

    getSectionLabel(labelText, tooltip) {
        const label = document.createElement('label');

        label.textContent = labelText;

        label.appendChild(CustomObjectBaseForm.getTooltipSpan(tooltip));

        return label;
    }

    getAddButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addObjectSelect() };

        return button;
    }

    /**
     * 
     * @param {ApiObjectInfo} selectedObject 
     */
    addObjectSelect(selectedObject) {
        this.appendChild(new ObjectSelect(this.possibleObjects, selectedObject));
    }

    /**
     * 
     * @returns {ApiObjectInfo[]}
     */
    getValue() {
        /** @type {ObjectSelect[]} */
        const objectSelects = Array.from(this.querySelectorAll('object-select'));

        return objectSelects.map(objectSelect => objectSelect.getValue());
    }
}

customElements.define('linked-objects-section', LinkedObjectsSection);