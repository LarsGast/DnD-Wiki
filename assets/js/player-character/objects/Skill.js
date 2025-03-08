import { ApiCategory, getApiResultsAsync } from "../api.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";
import { ResourceList } from "./ResourceList.js";

export class Skill extends ApiObjectInfo {

    /**
     * Flavor description of the skill.
     * @type {string[]}
     */
    desc;

    /**
     * The ability score that the skill is typically used as.
     * @type {ApiObjectInfo}
     */
    ability_score;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get a single skill from the 5e SRD API.
     * @param {string} index Index as specified in the API.
     * @returns {Promise<Skill>}
     */
    static async getAsync(index) {
        return new Skill(await getApiResultsAsync(ApiCategory.Skills, index));
    }

    /**
     * Get a all skills from the 5e SRD API.
     * @returns {Promise<ResourceList>}
     */
    static async getAll() {
        return await getApiResultsAsync(ApiCategory.Skills);
    }
}