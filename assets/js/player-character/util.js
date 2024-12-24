import { getPlayerCharacterProperty } from '../local-storage-util.js';

/**
 * Get the ability score modifier from an ability score.
 * @param {string} abilityName
 * @returns {number}
 */
export const getAbilityScoreModifier = function(abilityName) {

    const abilityScore = getPlayerCharacterProperty(abilityName);

    return Math.floor((abilityScore - 10) / 2);
}

/**
 * Get the proficiency modifier of a player character based on the levels of that character.
 * @returns {number}
 */
export const getProficiencyModifier = function() {

    const classes = getPlayerCharacterProperty("classes");

    const totalLevel = classes.map(classObject => classObject.level).reduce((partialSum, level) => partialSum + level, 0);
    return Math.ceil(totalLevel / 4) + 1;
}

/**
 * Get the abbreviated name of an ability.
 * @param {string} abilityName 
 * @returns {string} 3 letter abbreviation.
 */
export const getAbbreviationOfAbility = function(abilityName) {
    switch(abilityName){
        case 'strength':
            return 'STR';
        case 'dexterity':
            return 'DEX';
        case 'constitution':
            return 'CON';
        case 'intelligence':
            return 'INT';
        case 'wisdom':
            return 'WIS';
        case 'charisma':
            return 'CHA';
    }
}