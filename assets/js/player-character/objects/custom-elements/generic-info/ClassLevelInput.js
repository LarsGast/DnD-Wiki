// class-level-input.js
import { getEmptyOption } from "../../../util.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";
import { Class } from "../../api/resources/Class.js";

export class ClassLevelInput extends HTMLElement {
    constructor(classIndex, level) {
        super();

        this.classIndex = classIndex;
        this.level = level;
        
        // Create elements.
        this.classSelect = document.createElement("select");

        this.levelInput = document.createElement("input");
        this.levelInput.type = "number";
        this.levelInput.min = "1";
        this.levelInput.max = "20";
        this.levelInput.value = 1;

        this.deleteButton = document.createElement("button");
        this.deleteButton.type = "button";
        this.deleteButton.textContent = "Remove class";
        
        // Add to element.
        this.appendChild(this.classSelect);
        this.appendChild(this.levelInput);
        this.appendChild(this.deleteButton);

        // Bind event handlers.
        this.classSelect.onchange = () => this.handleChange();
        this.levelInput.onchange = () => this.handleChange();
        this.deleteButton.onclick = () => {
            const parentLi = this.closest("li");
            if (parentLi) {
                parentLi.remove();
            }
            this.handleChange();
        }
    }

    connectedCallback() {
        this.loadOptions();

        if(!this.classIndex) {
            this.handleChange();
        }

        this._updateHandler = () => this.updateDisplay();
        document.addEventListener("classesUpdated", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("classesUpdated", this._updateHandler);
    }

    async loadOptions() {
        // Load the available classes.
        const allClasses = await Class.getAllAsync();
        
        // Add an empty option.
        this.classSelect.appendChild(getEmptyOption());
        
        allClasses.results.forEach((cls) => {
            const option = document.createElement("option");
            option.value = cls.index;
            option.textContent = cls.name;
            this.classSelect.appendChild(option);
        });
        
        // If this element already has values (for example, loaded from storage), you might set them here.
        this.classSelect.value = this.classIndex ?? null;
        this.levelInput.value = this.level ?? 1;
    }
  
    handleChange() {
        // Here you might update the globalPlayerCharacter.classes array by re-querying
        // all <class-level-input> instances on the page.
        this.saveClasses();

        // Trigger a global event to signal that the PC has updated.
        document.dispatchEvent(new Event("classesUpdated"));
    }
    
    updateDisplay() {
        
        if (this.levelInput.value > 20) {
            this.levelInput.value = 20;
            this.levelInput.dispatchEvent(new Event('change'));
        }

        if (this.levelInput.value < 1) {
            this.levelInput.value = 1;
            this.levelInput.dispatchEvent(new Event('change'));
        }
    }

    saveClasses() {
        const classInputs = document.querySelectorAll("class-level-input");
        let classes = [];
        classInputs.forEach((el) => {
            // Assuming each element’s shadow DOM contains the select and input as first children.
            const select = el.querySelector("select");
            const input = el.querySelector("input");
            if (select.value) {
                classes.push({
                    index: select.value,
                    level: parseInt(input.value, 10)
                });
            }
        });
        
        // Save updated PC.
        globalPlayerCharacter.setProperty('classes', classes);
    }
}

// Register the custom element.
customElements.define("class-level-input", ClassLevelInput);