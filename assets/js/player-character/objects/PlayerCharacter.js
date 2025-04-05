const PLAYER_CHARACTER_KEY = "playerCharacter";

/**
 * The current latest version of the PC object.
 * This should be updated whenever a breaking change is performed on the PC object blueprint.
 */
export const LATEST_PLAYER_CHARACTER_VERSION_NUMBER = 3;

/**
 * Contains all information of a character needed to build the PC-Builder page.
 */
export class PlayerCharacter {

    /**
     * Name of the character.
     * @type {string | null}
     */
    name = null;

    /**
     * All chosen classes of the character.
     * Empty array if none are chosen yet.
     * Each item matches the "index" property in the 5e API.
     * @type {object[]}
     */
    classes = [];

    /**
     * Chosen race of the character.
     * Null if none is chosen.
     * Matches the "index" property in the 5e API.
     * @type {string | null}
     */
    race = null;

    /**
     * Chosen subrace of the character.
     * Null if none is chosen.
     * Matches the "index" property in the 5e API.
     * @type {string | null}
     */
    subrace = null;

    /**
     * Chosen background of the character.
     * Null if none is chosen.
     * Matches the "index" property in the 5e API.
     * @type {string | null}
     */
    background = null;

    /**
     * Chosen alignment of the character.
     * Null if none is chosen.
     * Matches the "index" property in the 5e API.
     * @type {string | null}
     */
    alignment = null;

    /**
     * Strength score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    str = 10;

    /**
     * Dexterity score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    dex = 10;

    /**
     * Constitution score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    con = 10;

    /**
     * Intelligence score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    int = 10;

    /**
     * Wisdom score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    wis = 10;

    /**
     * Charisma score of the character.
     * Matches the "index" property in the 5e API.
     * @type {number}
     */
    cha = 10;

    /**
     * All proficiencies of the character.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    proficiencies = [];

    /**
     * All expertises of the character.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    expertises = [];

    /**
     * All weapon proficiencies of the character.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    weaponProficiencies = [];

    /**
     * All armor proficiencies of the character.
     * Each item matches the "index" property in the 5e API.
     * @type {string[]}
     */
    armorProficiencies = [];

    /**
     * All weapons in the inventory of the character.
     * Each item.index matches the "index" property in the 5e API.
     * @type {object[]}
     */
    inventoryWeapons = [];

    /**
     * All armor in the inventory of the character.
     * Each item.index matches the "index" property in the 5e API.
     * @type {object[]}
     */
    inventoryArmor = [];

    /**
     * Notes that the user has filled in.
     * @type {string}
     */
    notes = "";

    /**
     * Version number of the character.
     * Is used to upgrade the character when breaking changes have occurred.
     * @type {number | null}
     */
    version = null;

    constructor(data = {}) {
        Object.assign(this, data);
    }

    /**
     * Sets a property value.
     * Saves the PC automatically after change.
     * @param {string} propertyName Name of the property on the PlayerCharacter object.
     * @param {any} propertyValue Value that the property should take on.
     */
    setProperty(propertyName, propertyValue) {
        this[propertyName] = propertyValue;
        this.save();
    }
    
    /**
     * Saves the character to local storage.
     */
    save() {
        try {
            localStorage.setItem(PLAYER_CHARACTER_KEY, JSON.stringify(this));
        } catch (error) {
            console.error("Error while saving Player Character:", error);
        }
    }

    /**
     * Loads the character from local storage.
     * @returns {PlayerCharacter} A PlayerCharacter instance.
     */
    static load() {

        try {
            const playerCharacterAsString = localStorage.getItem(PLAYER_CHARACTER_KEY);

            // If no PC exists yet, create a new one with default values.
            // Should only occur if the user visits the site for the very first time.
            if (!playerCharacterAsString) {
                const defaultCharacter = PlayerCharacter.getDefault();
                defaultCharacter.save();
                return defaultCharacter;
            }

            const playerCharacterAsJson = JSON.parse(playerCharacterAsString);

            return new PlayerCharacter(playerCharacterAsJson);
        } 
        catch (error) {
            console.error("Error parsing player character JSON:", error);
            return new PlayerCharacter();
        }
    }

    /**
     * Returns a default PlayerCharacter.
     * @returns {PlayerCharacter} A PlayerCharacter instance with default values.
     */
    static getDefault() {
        const playerCharacter = new PlayerCharacter();

        // Set the version to the current one.
        // Update this value if a breaking change occurs.
        playerCharacter.version = LATEST_PLAYER_CHARACTER_VERSION_NUMBER;

        return playerCharacter;
    }

    reset() {
        PlayerCharacter.getDefault().save();
    }

    getProficiencyBonus() {
        const totalLevel = this.classes.reduce((sum, cls) => sum + (cls.level || 0), 0);
        
        let bonus = 2;
        if (totalLevel >= 5 && totalLevel <= 8) bonus = 3;
        else if (totalLevel >= 9 && totalLevel <= 12) bonus = 4;
        else if (totalLevel >= 13 && totalLevel <= 16) bonus = 5;
        else if (totalLevel >= 17) bonus = 6;

        return bonus;
    }

    getAbilityModifier(ability) {
        const abilityScore = this[ability];

        return Math.floor((abilityScore - 10) / 2);
    }

    getSkillModifier(skill) {
        let skillModifier = this.getAbilityModifier(skill.ability_score.index);

        if (this.isProficientInSkill(skill.index)) {
            skillModifier += this.getProficiencyBonus();
        }

        if (this.isExpertInSkill(skill.index)) {
            skillModifier += this.getProficiencyBonus();
        }

        return skillModifier;
    }

    isProficientInSkill(skillIndex) {
        return this.proficiencies.includes(skillIndex);
    }

    isExpertInSkill(skillIndex) {
        return this.expertises.includes(skillIndex);
    }

    addProficiencyInSkill(skillIndex) {
        if (this.isProficientInSkill(skillIndex)) {
            return;
        }

        const proficiencies = this.proficiencies;
        proficiencies.push(skillIndex);

        this.setProperty("proficiencies", proficiencies);
    }

    removeProficiencyInSkill(skillIndex) {
        if (!this.isProficientInSkill(skillIndex)) {
            return;
        }

        let proficiencies = this.proficiencies;
        proficiencies = proficiencies.filter(skill => skill !== skillIndex);

        this.setProperty("proficiencies", proficiencies);
    }

    addExpertiseInSkill(skillIndex) {
        if (this.isExpertInSkill(skillIndex)) {
            return;
        }

        const expertises = this.expertises;
        expertises.push(skillIndex);

        this.setProperty("expertises", expertises);
    }

    removeExpertiseInSkill(skillIndex) {
        if (!this.isExpertInSkill(skillIndex)) {
            return;
        }

        let expertises = this.expertises;
        expertises = expertises.filter(skill => skill !== skillIndex);

        this.setProperty("expertises", expertises);
    }

    isProficientInWeapon(weaponIndex) {
        return this.weaponProficiencies.includes(weaponIndex);
    }

    addProficiencyInWeapon(weaponIndex) {
        if (this.isProficientInWeapon(weaponIndex)) {
            return;
        }

        const weaponProficiencies = this.weaponProficiencies;
        weaponProficiencies.push(weaponIndex);

        this.setProperty("weaponProficiencies", weaponProficiencies);
    }

    removeProficiencyInWeapon(weaponIndex) {
        if (!this.isProficientInWeapon(weaponIndex)) {
            return;
        }

        let weaponProficiencies = this.weaponProficiencies;
        weaponProficiencies = weaponProficiencies.filter(weapon => weapon !== weaponIndex);

        this.setProperty("weaponProficiencies", weaponProficiencies);
    }

    isProficientInArmor(armorIndex) {
        return this.armorProficiencies.includes(armorIndex);
    }

    addProficiencyInArmor(armorIndex) {
        if (this.isProficientInArmor(armorIndex)) {
            return;
        }

        const armorProficiencies = this.armorProficiencies;
        armorProficiencies.push(armorIndex);

        this.setProperty("armorProficiencies", armorProficiencies);
    }

    removeProficiencyInArmor(armorIndex) {
        if (!this.isProficientInArmor(armorIndex)) {
            return;
        }

        let armorProficiencies = this.armorProficiencies;
        armorProficiencies = armorProficiencies.filter(armor => armor !== armorIndex);

        this.setProperty("armorProficiencies", armorProficiencies);
    }

    editWeaponAbility(index, ability) {
        if (index > this.inventoryWeapons.length) {
            return;
        }

        const inventoryWeapons = this.inventoryWeapons;
        inventoryWeapons[index].ability = ability;

        this.setProperty("inventoryWeapons", inventoryWeapons);
    }

    getWeaponAttackBonus(weaponIndex, ability) {
        let attackBonus = this.getAbilityModifier(ability);

        if (this.isProficientInWeapon(weaponIndex)) {
            attackBonus += this.getProficiencyBonus();
        }

        return attackBonus;
    }

    addWeaponToInventory(weaponIndex, ability) {
        const inventoryWeapons = this.inventoryWeapons;
        
        inventoryWeapons.push({
            index: weaponIndex,
            ability: ability
        })
    
        this.setProperty("inventoryWeapons", inventoryWeapons);
    }

    removeWeaponFromInventory(index) {
        const inventoryWeapons = this.inventoryWeapons;

        inventoryWeapons.splice(index, 1);
    
        this.setProperty("inventoryWeapons", inventoryWeapons);
    }

    addArmorToInventory(armorIndex) {
        const inventoryArmor = this.inventoryArmor;
        
        inventoryArmor.push({
            index: armorIndex
        })
    
        this.setProperty("inventoryArmor", inventoryArmor);
    }

    removeArmorFromInventory(index) {
        const inventoryArmor = this.inventoryArmor;

        inventoryArmor.splice(index, 1);
    
        this.setProperty("inventoryArmor", inventoryArmor);
    }
}

/**
 * Contains all information of a character needed to build the PC-Builder page.
 */
export const globalPlayerCharacter = PlayerCharacter.load();