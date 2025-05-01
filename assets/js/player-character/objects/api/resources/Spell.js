import { ApiCategory } from "../../../api.js";
import { ApiBaseObject } from "./ApiBaseObject.js";

export class Spell extends ApiBaseObject {

    static apiCategory = ApiCategory.Spells;

    /**
     * Description of the resource.
     * @type {string[]}
     */
    desc;

    /**
     * List of descriptions for casting the spell at higher levels.
     * @type {string[]}
     */
    higher_level;

    /**
     * Range of the spell, usually expressed in feet.
     * @type {string}
     */
    range;

    /**
     * List of shorthand for required components of the spell. V: verbal S: somatic M: material
     * @type {string[]} ["V", "S", "M"]
     */
    components;

    /**
     * Material component for the spell to be cast.
     * @type {string}
     */
    material;

    /**
     * 
     * @type {AreaOfEffect}
     */
    area_of_effect;

    /**
     * Determines if a spell can be cast in a 10-min(in-game) ritual.
     * @type {boolean}
     */
    ritual;

    /**
     * How long the spell effect lasts.
     * @type {string}
     */
    duration;

    /**
     * Determines if a spell needs concentration to persist.
     * @type {boolean}
     */
    concentration;

    /**
     * How long it takes for the spell to activate.
     * @type {string}
     */
    casting_time;

    /**
     * Level of the spell.
     * @type {number}
     */
    level;

    /**
     * Attack type of the spell.
     * @type {string}
     */
    attack_type;

    /**
     * 
     * @type {Damage}
     */
    damage;

    /**
     * 
     * @type {Dc}
     */
    dc;

    /**
     * 
     * @type {ApiBaseObject}
     */
    school;

    /**
     * List of classes that are able to learn the spell.
     * @type {ApiBaseObject[]}
     */
    classes;

    /**
     * List of subclasses that have access to the spell.
     * @type {ApiBaseObject[]}
     */
    subclasses;

    /**
     * Constructor.
     * @param {JSON} data Full object as specified in the 5e SRD API.
     */
    constructor(data) {
        super(data);
        Object.assign(this, data);
    }
}

class AreaOfEffect {

    /**
     * 
     * @type {number}
     */
    size;

    /**
     * 
     * @type {number} ["sphere", "cone", "cylinder", "line", "cube"]
     */
    type;
}

class Damage {

    /**
     * 
     * @type {ApiBaseObject}
     */
    damage_type;

    /**
     * 
     * @type {object}
     */
    damage_at_character_level;

    /**
     * 
     * @type {object}
     */
    damage_at_slot_level;
}

class Dc {

    /**
     * 
     * @type {ApiBaseObject}
     */
    damage_at_slot_level;

    /**
     * 
     * @type {string}
     */
    dc_success;
}