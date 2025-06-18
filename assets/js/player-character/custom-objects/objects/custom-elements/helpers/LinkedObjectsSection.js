import { ApiObjectInfo } from "../../../../objects/api/resources/ApiObjectInfo.js";
import { ObjectSelect } from "./ObjectSelect.js";

export class LinkedObjectsSection extends HTMLElement {

    /**
     *
     */
    constructor(label, possibleObjects, selectedObjects) {
        super();
        
        /** @type {ApiObjectInfo[]} */
        this.possibleObjects = possibleObjects;

        this.appendChild(this.getSectionLabel(label));
        this.appendChild(this.getAddButton());

        for (const selectedObject of selectedObjects) {
            this.addObjectSelect(selectedObject);
        }
    }

    getSectionLabel(labelText) {
        const label = document.createElement('label');

        label.textContent = labelText;

        return label;
    }

    getAddButton() {
        const button = document.createElement('button');

        button.textContent = "Add";
        button.type = "button";
        button.onclick = () => { this.addObjectSelect() };

        return button;
    }

    addObjectSelect(selectedObject) {
        this.appendChild(new ObjectSelect(this.possibleObjects, selectedObject));
    }
}

customElements.define('linked-objects-section', LinkedObjectsSection);