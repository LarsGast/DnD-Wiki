import { addToCache, getFromCache } from "./cache.js";

const baseUrl = 'https://www.dnd5eapi.co/api';

/**
 * Enum-like class that holds all endpoints of the SRD API.
 */
export class ApiCategory {
    static AbilityScores = new ApiCategory("ability-scores", "Ability score");
    static Alignments = new ApiCategory("alignments", "Alignment");
    static Backgrounds = new ApiCategory("backgrounds", "Background");
    static Classes = new ApiCategory("classes", "Class");
    static Conditions = new ApiCategory("conditions", "Condition");
    static DamageTypes = new ApiCategory("damage-types", "Damage type");
    static Equipment = new ApiCategory("equipment", "Equipment");
    static EquipmentCategories = new ApiCategory("equipment-categories", "Equipment category");
    static Feats = new ApiCategory("feats", "Feat");
    static Features = new ApiCategory("features", "Feature");
    static Languages = new ApiCategory("languages", "Language");
    static MagicItems = new ApiCategory("magic-items", "Magic item");
    static MagicSchools = new ApiCategory("magic-schools", "Magic school");
    static Monsters = new ApiCategory("monsters", "Monster");
    static Proficiencies = new ApiCategory("proficiencies", "Proficiency");
    static Races = new ApiCategory("races", "Race");
    static RuleSections = new ApiCategory("rule-sections", "Rule section");
    static Rules = new ApiCategory("rules", "Rule");
    static Skills = new ApiCategory("skills", "Skill");
    static Spells = new ApiCategory("spells", "Spell");
    static Subclasses = new ApiCategory("subclasses", "Subclass");
    static Subraces = new ApiCategory("subraces", "Subrace");
    static Traits = new ApiCategory("traits", "Trait");
    static WeaponProperties = new ApiCategory("weapon-properties", "Weapon property");

    constructor(name, singularName) {

        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.singularName = singularName;
    }
}

/**
 * Enum-like class that holds certain indexes of equipment categories in the SRD API.
 * Does not include everything (yet).
 */
export class EquipmentCategoryIndex {
    static HeavyArmor = new EquipmentCategoryIndex("heavy-armor");
    static MediumArmor = new EquipmentCategoryIndex("medium-armor");
    static LightArmor = new EquipmentCategoryIndex("light-armor");
    static Shields = new EquipmentCategoryIndex("shields");

    static SimpleMeleeWeapons = new EquipmentCategoryIndex("simple-melee-weapons");
    static MartialMeleeWeapons = new EquipmentCategoryIndex("martial-melee-weapons");

    static SimpleRangedWeapons = new EquipmentCategoryIndex("simple-ranged-weapons");
    static MartialRangedWeapons = new EquipmentCategoryIndex("martial-ranged-weapons");

    constructor(name) {
        this.name = name
    }
}

/**
 * Call the SRD API and return the results.
 * @param {ApiCategory} apiCategory Category or endpoint of the resource.
 * @param {string} index Identifier of the resource (optional).
 * @returns {Promise<JSON>} Full object as specified in the SRD API specifications.
 */
export const getApiResultsAsync = async function(apiCategory, index = null) {

    // Craft the URL string bases on the given parameters.
    // index?.name is not undefined if it is an enum-like class.
    let indexString = index?.name ?? index ?? '';
    const url = `${baseUrl}/${apiCategory.name}/${indexString}`;

    // Check the cache first.
    const cachedData = getFromCache(url);
    if (cachedData) {
        return cachedData;
    }

    // If cache isn't hit, call the API and add the results to the cache.
    const data = await getApiDataAsync(url);
    addToCache(url, data);

    return data;
}

/**
 * Perform an API call and get data from https://www.dnd5eapi.co.
 * @param {string} url 
 * @returns {Promise<JSON>}
 */
const getApiDataAsync = async function(url) {

    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    }
    catch (error) {
        console.error(error.message);
    }
}