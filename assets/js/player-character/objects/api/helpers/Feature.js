import { ApiCategory } from "../../../api.js";
import { ApiBaseObject } from "../resources/ApiBaseObject.js";

export class Feature extends ApiBaseObject {

    static apiCategory = ApiCategory.Features;

    desc;

    level;

    class;

    subclass;

    parent;

    prerequisites;

    feature_specific;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}