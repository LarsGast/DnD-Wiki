import { InventoryWeaponAttackBonusCell } from "./InventoryWeaponAttackBonusCell.js";
import { Weapon } from "./api/resources/equipment/Weapon.js";
import { InventoryWeaponAbilityCell } from "./InventoryWeaponAbilityCell.js";
import { InventoryDamageCell } from "./InventoryWeaponDamageCell.js";
import { InventoryWeaponButtonsCell } from "./InventoryWeaponButtonsCell.js";

export class InventoryWeaponRow extends HTMLTableRowElement {
    /**
     * 
     * @param {Weapon} weapon 
     */
    constructor(weapon) {
        super();

        this.weapon = weapon;
    }
    
    connectedCallback() {

        this.nameCell = document.createElement('td');
        this.nameCell.headers = 'weapon_name';
        this.nameCell.textContent = this.weapon.name;

        this.abilityCell = new InventoryWeaponAbilityCell(this.weapon, this.rowIndex - 1);
        this.abilityCell.headers = 'weapon_ability';

        this.attackBonusCell = new InventoryWeaponAttackBonusCell(this.weapon, this.rowIndex - 1);
        this.attackBonusCell.headers = 'weapon_attack-bonus';

        this.damageCell = new InventoryDamageCell(this.weapon, this.rowIndex - 1);
        this.damageCell.headers = 'weapon_damage';

        this.damageTypeCell = document.createElement('td');
        this.damageTypeCell.headers = 'weapon_damage-type';
        this.damageTypeCell.textContent = this.weapon.damage.damage_type.name;

        this.rangeCell = document.createElement('td');
        this.rangeCell.headers = 'weapon_range';
        this.rangeCell.textContent = this.weapon.range.normal;

        this.weightCell = document.createElement('td');
        this.weightCell.headers = 'weapon_weight';
        this.weightCell.textContent = this.weapon.weight;

        this.buttonsCell = new InventoryWeaponButtonsCell(this.weapon, this.rowIndex - 1);
        this.buttonsCell.headers = 'weapon_buttons';

        this.appendChild(this.nameCell);
        this.appendChild(this.abilityCell);
        this.appendChild(this.attackBonusCell);
        this.appendChild(this.damageCell);
        this.appendChild(this.damageTypeCell);
        this.appendChild(this.rangeCell);
        this.appendChild(this.weightCell);
        this.appendChild(this.buttonsCell);
    }
}

customElements.define("inventory-weapon-row", InventoryWeaponRow, { extends: 'tr' });