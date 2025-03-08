import { ApiCategory, getApiResultsAsync } from "../api.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class Alignment extends ApiObjectInfo {

    /**
     * Abbreviation/initials/acronym for the alignment.
     * @type {string}
     */
    abbreviation;

    /**
     * Brief description of the alignment.
     * @type {string}
     */
    desc;
    
    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get a single alignments from the 5e SRD API.
     * @param {string} index Index as specified in the API.
     * @returns {Promise<Alignment>}
     */
    static async getAsync(index) {
        return new Alignment(await getApiResultsAsync(ApiCategory.Alignments, index));
    }

    /**
     * Get a all alignments from the 5e SRD API.
     * @returns {Promise<ResourceList>}
     */
    static async getAll() {
        return await getApiResultsAsync(ApiCategory.Alignments);
    }
}