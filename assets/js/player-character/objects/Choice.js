import { ApiObjectInfo } from "./ApiObjectInfo.js";

/**
 * Object for storing information about a choice the player is given when gaining a new feature.
 */
export class Choice {
    
    /**
     * How many of the choices can be chosen.
     * @type {number}
     */
    choose;
    
    /**
     * The type of object that is being chosen.
     * Examples: proficiencies, languages .
     * @type {string}
     */
    type;
    
    /**
     * The options to choose from.
     * @type {ChoiceFrom}
     */
    from;
}

/**
 * Object for storing information about the specific choices a player can make when gaining a feature that let's them choose.
 */
class ChoiceFrom {
    
    /**
     * Type of option set.
     * Can be options_array for an array of objects, equipment_category for a collection of equipments, or resource_list for only the reference to the object.
     * @type {string}
     */
    option_set_type;

    /**
     * The options to choose from.
     * @type {ChoiceOption[]}
     */
    options;
}

/**
 * Option that the player can choose from when gaining a feature that let's them choose.
 */
class ChoiceOption {
    
    /**
     * Type of option.
     * @type {string}
     */
    option_type;
    
    /**
     * Reference to the object in the API of the actual choice.
     * @type {ApiObjectInfo}
     */
    item;
}