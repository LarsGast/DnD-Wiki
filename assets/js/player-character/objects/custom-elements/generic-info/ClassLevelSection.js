import { globalPlayerCharacter } from "../../PlayerCharacter.js";
import { ClassLevelInput } from "./ClassLevelInput.js";

export class ClassLevelSection extends HTMLElement {
    /**
     *
     */
    constructor() {
        super();
        
        this.addClassButton = document.createElement('button');
        this.addClassButton.type = 'button';
        this.addClassButton.textContent = 'Add class';
        this.addClassButton.onclick = () => this.onAddClassButtonClick();

        this.classLevelList = document.createElement('ul');

        this.appendChild(this.addClassButton);
        this.appendChild(this.classLevelList);
    }

    connectedCallback() {
        if (globalPlayerCharacter.classes.length > 0) {
            for (const classLevel of globalPlayerCharacter.classes) {
                const classLevelInput = new ClassLevelInput(classLevel.index, classLevel.level);
    
                this.classLevelList.appendChild(classLevelInput);
            }
        }
        else {
            this.classLevelList.appendChild(new ClassLevelInput());
        }

        this._updateHandler = () => this.saveClasses();
        document.addEventListener("classAdded", this._updateHandler);
        document.addEventListener("classChanged", this._updateHandler);
        document.addEventListener("classLevelChanged", this._updateHandler);
        document.addEventListener("classDeleted", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("classAdded", this._updateHandler);
        document.removeEventListener("classChanged", this._updateHandler);
        document.removeEventListener("classLevelChanged", this._updateHandler);
        document.removeEventListener("classDeleted", this._updateHandler);
    }

    onAddClassButtonClick() {
        this.classLevelList.appendChild(new ClassLevelInput());

        document.dispatchEvent(new Event("classAdded"));
    }

    saveClasses() {
        let classes = [];
        this.classLevelList.childNodes.forEach((el) => {
            // Assuming each element’s shadow DOM contains the select and input as first children.
            const select = el.querySelector("select");
            const input = el.querySelector("input");

            const value = select.value == "null" ? null : select.value;

            if (value) {
                classes.push({
                    index: value,
                    level: parseInt(input.value, 10)
                });
            }
        });
        
        // Save updated PC.
        globalPlayerCharacter.setProperty('classes', classes);

        document.dispatchEvent(new Event("classesChanged"));
    }
}

customElements.define('class-level-section', ClassLevelSection);