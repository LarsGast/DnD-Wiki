import { ApiCategory, getApiResultsAsync } from "../api.js";
import { ApiObjectInfo } from "./ApiObjectInfo.js";

export class EquipmentCategory extends ApiObjectInfo {

    /**
     * All equipments that fall under this category.
     * @type {ApiObjectInfo[]}
     */
    equipment;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }

    /**
     * Get a single equipment category from the 5e SRD API.
     * @param {string} index Index as specified in the API.
     * @returns {Promise<EquipmentCategory>}
     */
    static async getAsync(index) {
        return new EquipmentCategory(await getApiResultsAsync(ApiCategory.EquipmentCategories, index));
    }
}