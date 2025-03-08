import { ApiCategory, getApiResultsAsync } from "../api.js";
import { AbilityBonus } from "./AbilityBonus.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { Choice } from "./Choice.js";
import { ResourceList } from "./ResourceList.js";
import { Trait } from "./Trait.js";

export class Subrace extends ApiObjectInfo {

    /**
     * Flavor description of the subrace.
     * @type {string}
     */
    desc;

    /**
     * The race that the subrace is a part of.
     * @type {ApiObjectInfo}
     */
    race;

    /**
     * Bonuses to abilities this subrace gives.
     * @type {AbilityBonus[]}
     */
    ability_bonuses;

    /**
     * A list of proficiencies the subrace starts with.
     * @type {ApiObjectInfo[]}
     */
    starting_proficiencies;

    /**
     * List of languages the subrace always learns.
     * @type {ApiObjectInfo[]}
     */
    languages;

    /**
     * If applicable, a choice in languages that the player can make choosing this subrace.
     * @type {Choice}
     */
    language_options;

    /**
     * A list of traits the subrace has.
     * @type {ApiObjectInfo[]}
     */
    racial_traits;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get a single subrace from the 5e SRD API.
     * @param {string} index Index as specified in the API.
     * @returns {Promise<Subrace>}
     */
    static async getAsync(index) {
        return new Subrace(await getApiResultsAsync(ApiCategory.Subraces, index));
    }

    /**
     * Get a all subraces from the 5e SRD API.
     * @returns {Promise<ResourceList>}
     */
    static async getAll() {
        return await getApiResultsAsync(ApiCategory.Subraces);
    }

    /**
     * Get the full object of all traits linked to this subrace.
     * @returns {Promise<Trait[]>}
     */
    async getAllTraitsAsync() {
        const traits = [];

        for (const traitInfo of this.racial_traits) {
            traits.push(await Trait.getAsync(traitInfo.index));
        }

        return traits;
    }
}