import { updateCharacter } from "../update-character.js";
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
    lastEdit = new Date();

    /**
     * Constructs a new PlayerCharacterBankEntry instance.
     * If data is provided, properties are assigned from it.
     * @param {JSON} data Optional initial data for the character bank entry.
     */
    constructor(data = {}) {
        Object.assign(this, data);

        this.playerCharacter = new PlayerCharacter(this.playerCharacter);
        this.lastEdit = new Date(this.lastEdit);
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

        this.playerCharacterBankEntries = this.playerCharacterBankEntries.map(entry => new PlayerCharacterBankEntry(entry));
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

        updateCharacter(playerCharacter);

        const bankEntry = new PlayerCharacterBankEntry();

        bankEntry.playerCharacter = playerCharacter;

        if (this.playerCharacterBankEntries.length === 0) {
            bankEntry.isActive = true;
        }

        this.playerCharacterBankEntries.push(bankEntry);
    }

    saveActiveCharacter(playerCharacter) {
        const currentCharacter = this.getActivePlayerCharacter();

        if (!currentCharacter) {
            throw new Error("No active character found");
        }

        currentCharacter.playerCharacter = playerCharacter;

        this.save();
    }

    setActiveCharacter(id) {

        const currentActiveCharacter = this.getActivePlayerCharacter();
        currentActiveCharacter.lastEdit = new Date();

        this.playerCharacterBankEntries.forEach(entry => entry.isActive = false);

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