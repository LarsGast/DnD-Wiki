import { globalPlayerCharacter } from "../../PlayerCharacter.js";


export class WeaponProficiencyCheckbox extends HTMLInputElement {

    constructor(weapon) {
        super();

        this.weapon = weapon;
        
        this.type = "checkbox";

        this.checked = globalPlayerCharacter.isProficientInWeapon(this.weapon.index);

        this.onclick = () => this.handleChange();
    }
  
    handleChange() {

        if (this.checked) {
            globalPlayerCharacter.addProficiencyInWeapon(this.weapon.index);
        }
        else {
            globalPlayerCharacter.removeProficiencyInWeapon(this.weapon.index);
        }

        document.dispatchEvent(new CustomEvent("weaponProficiencyChanged", {
            detail: { 
                weapon: this.weapon.index 
            },
            bubbles: true
        }));
    }
}

customElements.define("weapon-proficiency-checkbox", WeaponProficiencyCheckbox, { extends: 'input' });