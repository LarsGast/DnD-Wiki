import { ApiCategory, getApiResultsAsync } from "../api.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class Trait extends ApiObjectInfo {

    /**
     * Description of the trait.
     * Can consist of multiple paragraphs.
     * @type {string[]}
     */
    desc;

    /**
     * List of races that get this trait.
     * @type {ApiObjectInfo[]}
     */
    races;

    /**
     * List of subraces that get this trait.
     * @type {ApiObjectInfo[]}
     */
    subraces;

    /**
     * List of proficiencies that this trait provides.
     * @type {ApiObjectInfo[]}
     */
    proficiencies;

    /**
     * If applicable, a choice in proficiencies that the player can make when getting this trait.
     * @type {Choice}
     */
    proficiency_choices;

    /**
     * If applicable, a choice in languages that the player can make when getting this trait.
     * @type {Choice}
     */
    language_options;

    /**
     * Any extra trait-specific information.
     * Can differ in specification per trait.
     * @type {JSON}
     */
    trait_specific;
    
    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get a single trait from the 5e SRD API.
     * @param {string} index Index as specified in the API.
     * @returns {Promise<Trait>}
     */
    static async getAsync(index) {
        return new Trait(await getApiResultsAsync(ApiCategory.Traits, index));
    }
}