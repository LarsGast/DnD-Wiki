import { ApiCategory, getApiResultsAsync } from "../../../api.js";
import { Feature } from "../helpers/Feature.js";
import { ApiBaseObject } from "./ApiBaseObject.js";

export class Subclass extends ApiBaseObject {

    static apiCategory = ApiCategory.Subclasses;

    desc;

    class;

    subclass_flavor;

    subclass_levels;

    spells;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * 
     * @param {number} level
     * @returns {Promise<Feature[]>} 
     */
    async getFeaturesForLevelAsync(level) {
        const response = await getApiResultsAsync(ApiCategory.Subclasses, `${this.index}/levels/${level}/features`);

        return Promise.all(response.results.map(featureInfo => Feature.getAsync(featureInfo.index)));
    }
}