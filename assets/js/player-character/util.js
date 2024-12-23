/**
 * Get the ability score modifier from an ability score.
 * @param {number} score
 * @returns {number}
 */
export const getAbilityScoreModifier = function(score) {
    return Math.floor((score - 10) / 2);
}

/**
 * Get the proficiency modifier of a player character based on the levels of that character.
 * @param {{className: string, level: number}[]} levels 
 * @returns {number}
 */
export const getProficiencyModifier = function(levels) {
    const totalLevel = levels.map(level => level.level).reduce((partialSum, level) => partialSum + level, 0);
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