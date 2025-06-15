import { ApiCategory } from "../../../api.js";

export class ApiObjectInfo {

    /**
     * Enum-like value that holds the endpoints of given class.
     * Must be implemented in every class that extends ApiBaseObject.
     * @type {ApiCategory}
     */
    static apiCategory;

    /**
     * Unique identifier in the 5e SRD API.
     * UUID for custom objects.
     * @type {string}
     */
    index;

    /**
     * Display name of the object.
     * @type {string}
     */
    name;

    /**
     * Url to the object within the API.
     * @type {string}
     */
    url;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        Object.assign(this, data);
    }

    static getDefault() {
        const obj = new this();

        obj.index = self.crypto.randomUUID();
        obj.name = "New Custom Object";
    
        return obj;
    }

    get apiCategory() {
        return this.constructor.apiCategory;
    }
}