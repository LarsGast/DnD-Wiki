import { ApiObjectInfo } from "./api/resources/ApiObjectInfo";

/**
 * Key used for saving and loading the custom object bank from localStorage.
 * @constant {string}
 */
const CUSTOM_OBJECT_BANK_KEY = "customObjectBank";

/**
 * The current latest version of the custom object bank object.
 * This should be updated whenever a breaking change is performed on the custom object bank object specification.
 * @constant {number}
 */
export const LATEST_CUSTOM_OBJECT_BANK_VERSION_NUMBER = 1;

/**
 * The current latest version of the custom object bank entry object.
 * This should be updated whenever a breaking change is performed on the custom object bank entry object specification.
 * @constant {number}
 */
export const LATEST_CUSTOM_OBJECT_BANK_ENTRY_VERSION_NUMBER = 1;

export class CustomObjectBank {

    /**
     * Objects that contain all information about each saved custom object.
     * @type {CustomObjectBankEntry[]}
     */
    customObjectBankEntries = [];

    /**
     * Version number of the object bank.
     * Used to upgrade the bank when breaking changes in the data specification occur.
     * Default 1, which might be upgraded on page load.
     * @type {number}
     */
    version = 1;
    
    /**
     * Constructs a new CustomObjectBank instance.
     * If data is provided, properties are assigned from it.
     * @param {JSON} data Optional initial data for the object bank.
     */
    constructor(data = {}) {
        Object.assign(this, data);

        this.customObjectBankEntries = this.customObjectBankEntries.map(entry => new CustomObjectBankEntry(entry));
    }

    /**
     * Loads the object bank from localStorage.
     * If no saved bank exists, returns a default bank.
     * @returns {PlayerCharacterBank} The loaded or default bank instance.
     */
    static load() {
        try {
            const customObjectBankAsString = localStorage.getItem(CUSTOM_OBJECT_BANK_KEY);

            // If no stored bank is found, create a new default one.
            // Should only occur if the user visits the site for the very first time.
            if (!customObjectBankAsString) {
                const defaultBank = CustomObjectBank.getDefault();
                defaultBank.save();
                return defaultBank;
            }

            const customObjectBankAsJson = JSON.parse(customObjectBankAsString);

            return new CustomObjectBank(customObjectBankAsJson);
        }
        catch (error) {
            console.error("Error parsing custom object bank JSON:", error);
            return new CustomObjectBank();
        }
    }

    /**
     * Returns a default CustomObjectBank instance.
     * Sets the version to the latest version number.
     * @returns {CustomObjectBank} A new default object bank instance.
     */
    static getDefault() {
        const defaultBank = new CustomObjectBank();

        defaultBank.version = LATEST_CUSTOM_OBJECT_BANK_VERSION_NUMBER;

        return defaultBank;
    }

    /**
     * Saves the custom object bank object into localStorage to persist the data over multiple browser sessions.
     * Catches and logs any errors during saving.
     */
    save() {
        try {
            localStorage.setItem(CUSTOM_OBJECT_BANK_KEY, JSON.stringify(this));
        } catch (error) {
            console.error("Error while saving custom object bank:", error);
        }
    }
    
    /**
     * Adds a single custom object to the bank.
     * @param {ApiObjectInfo} customObject 
     */
    addNewCustomObject(customObject) {

        const bankEntry = new CustomObjectBankEntry();

        bankEntry.customObject = customObject;
        bankEntry.version = LATEST_CUSTOM_OBJECT_BANK_ENTRY_VERSION_NUMBER;

        this.customObjectBankEntries.push(bankEntry);
    }

    /**
     * Removes a single custom object from the bank.
     * @param {`${string}-${string}-${string}-${string}-${string}`} index UUID.
     */
    removeCustomObjectFromBank(index) {
        this.customObjectBankEntries = this.customObjectBankEntries.filter(entry => entry.customObject.index != index);
    }

    /**
     * Get a CustomObjectBankEntry by index.
     * @param {`${string}-${string}-${string}-${string}-${string}`} index UUID.
     * @returns {CustomObjectBankEntry}
     */
    getCustomObjectBankEntryByIndex(index) {
        return this.customObjectBankEntries.find(entry => entry.customObject.index === index);
    }

}

export class CustomObjectBankEntry {

    /**
     * All data required for a custom object.
     * @type {ApiObjectInfo}
     */
    customObject;

    /**
     * Date and time of the last time the custom object was edited.
     * This value gets updated when:
     * - The object is created (by import or manual)
     * - The object is saved
     * @type {Date}
     */
    lastEdit = new Date();

    /**
     * Version number of the custom object bank entry.
     * Used to upgrade the bank entries when breaking changes in the data specification occur.
     * Default 1, which might be upgraded on page load.
     * @type {number}
     */
    version = 1;
    
    /**
     * Constructs a new CustomObjectBankEntry instance.
     * If data is provided, properties are assigned from it.
     * @param {JSON} data Initial data for the object bank entry.
     */
    constructor(data = {}) {
        Object.assign(this, data);

        // Initialize objects.
        this.customObject = new ApiObjectInfo(this.customObject);
        this.lastEdit = new Date(this.lastEdit);
    }
}