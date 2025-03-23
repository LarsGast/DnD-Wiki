import { globalPlayerCharacter } from "./PlayerCharacter.js";

export class ArmorProficiencyCheckbox extends HTMLInputElement {

    constructor(armor) {
        super();

        this.armor = armor;
        
        this.type = "checkbox";

        this.checked = globalPlayerCharacter.isProficientInArmor(this.armor.index);

        this.onclick = () => this.handleChange();
    }
  
    handleChange() {

        if (this.checked) {
            globalPlayerCharacter.addProficiencyInArmor(this.armor.index);
        }
        else {
            globalPlayerCharacter.removeProficiencyInArmor(this.armor.index);
        }

        document.dispatchEvent(new CustomEvent("armorProficiencyChanged", {
            detail: { 
                armor: this.armor.index 
            },
            bubbles: true
        }));
    }
}

customElements.define("armor-proficiency-checkbox", ArmorProficiencyCheckbox, { extends: 'input' });