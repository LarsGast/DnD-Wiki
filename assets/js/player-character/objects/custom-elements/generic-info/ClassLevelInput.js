// class-level-input.js
import { getEmptyOption } from "../../../util.js";
import { Class } from "../../api/resources/Class.js";

export class ClassLevelInput extends HTMLLIElement {
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
        this.classSelect.onchange = () => this.handleClassChange();
        this.levelInput.onchange = () => this.handleLevelChange();
        this.deleteButton.onclick = () => this.handleDelete();
    }

    async connectedCallback() {
        await this.loadOptions();
    }

    async loadOptions() {
        
        // Add an empty option.
        this.classSelect.appendChild(getEmptyOption());

        // Load the available classes.
        const allClasses = await Class.getAllAsync();
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
  
    handleClassChange() {
        document.dispatchEvent(new Event("classChanged"));
    }

    handleLevelChange() {
        
        if (this.levelInput.value > 20) {
            this.levelInput.value = 20;
        }

        if (this.levelInput.value < 1) {
            this.levelInput.value = 1;
        }

        document.dispatchEvent(new Event("classLevelChanged"));
    }

    handleDelete() {
        this.remove();
        document.dispatchEvent(new Event("classDeleted"));
    }
}

// Register the custom element.
customElements.define("class-level-input", ClassLevelInput, { extends: 'li' });