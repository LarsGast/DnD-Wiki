import { PlayerCharacter } from "./PlayerCharacter.js";

/**
 * Key used for saving and loading the player character from localStorage.
 * @constant {string}
 */
const PLAYER_CHARACTER_BANK_KEY = "playerCharacterBank";

/**
 * The current latest version of the PC object.
 * This should be updated whenever a breaking change is performed on the PC object blueprint.
 * @constant {number}
 */
export const LATEST_PLAYER_CHARACTER_BANK_VERSION_NUMBER = 1;

export class PlayerCharacterBankEntry {

    /**
     * UUID.
     * @type {string}
     */
    id = self.crypto.randomUUID();;

    /**
     * @type {boolean}
     */
    isActive = false;

    /**
     * @type {PlayerCharacter}
     */
    playerCharacter;

    /**
     * @type {Date}
     */
    lastEdited = new Date();

    /**
     * Constructs a new PlayerCharacterBankEntry instance.
     * If data is provided, properties are assigned from it.
     * @param {JSON} data Optional initial data for the character bank entry.
     */
    constructor(data = {}) {
        Object.assign(this, data);
    }
}

export class PlayerCharacterBank {

    /**
     * @type {PlayerCharacterBankEntry[]}
     */
    playerCharacterBankEntries = [];

    version;

    /**
     * Constructs a new PlayerCharacterBank instance.
     * If data is provided, properties are assigned from it.
     * @param {JSON} data Optional initial data for the character bank.
     */
    constructor(data = {}) {
        Object.assign(this, data);
    }

    static load() {
        try {
            const playerCharactersAsString = localStorage.getItem(PLAYER_CHARACTER_BANK_KEY);

            // If no stored PC is found, create a new default one.
            // Should only occur if the user visits the site for the very first time.
            if (!playerCharactersAsString) {
                const defaultBank = PlayerCharacterBank.getDefault();
                defaultBank.save();
                return defaultBank;
            }

            const playerCharactersAsJson = JSON.parse(playerCharactersAsString);

            return new PlayerCharacterBank(playerCharactersAsJson);
        }
        catch (error) {
            console.error("Error parsing player character bank JSON:", error);
            return new PlayerCharacterBank();
        }
    }

    static getDefault() {
        const defaultBank = new PlayerCharacterBank();

        defaultBank.addNewCharacter(PlayerCharacter.getDefault());
        defaultBank.version = LATEST_PLAYER_CHARACTER_BANK_VERSION_NUMBER;

        return defaultBank;
    }

    save() {
        try {
            localStorage.setItem(PLAYER_CHARACTER_BANK_KEY, JSON.stringify(this));
        } catch (error) {
            console.error("Error while saving player character bank:", error);
        }
    }

    addNewCharacter(playerCharacter) {
        const bankEntry = new PlayerCharacterBankEntry();

        bankEntry.playerCharacter = playerCharacter;

        if (this.playerCharacterBankEntries.length === 0) {
            bankEntry.isActive = true;
        }

        this.playerCharacterBankEntries.push(bankEntry);
    }

    saveExistingCharacter(id, playerCharacter) {
        const existingCharacter = this.getCharacterById(id);

        if (!existingCharacter) {
            throw new Error(`No character found with given ID: ${id}`);
        }

        existingCharacter.playerCharacter = playerCharacter;
        existingCharacter.lastEdited = new Date();

        this.save();
    }

    setActiveCharacter(id) {
        this.playerCharacterBankEntries.forEach(entry => entry.isActive = false);

        console.log(id);

        const entry = this.getCharacterById(id);
        entry.isActive = true;
    }

    removeCharacterFromBank(id) {
        this.playerCharacterBankEntries = this.playerCharacterBankEntries.filter(entry => entry.id != id);
    }

    getCharacterById(id) {
        return this.playerCharacterBankEntries.find(entry => entry.id === id);
    }

    /**
     * @type {PlayerCharacterBankEntry}
     */
    getActivePlayerCharacter() {
        return this.playerCharacterBankEntries.find(entry => entry.isActive);
    }
    
    /**
     * @type {PlayerCharacterBankEntry[]}
     */
    getInactivePlayerCharacters() {
        return this.playerCharacterBankEntries.filter(entry => !entry.isActive);
    }
}

/**
 * Global singleton instance containing all PC information.
 * Loaded from localStorage; if no saved data exists, defaults are provided.
 * @type {PlayerCharacterBank}
 */
export const globalPlayerCharacterBank = PlayerCharacterBank.load();