const baseUrl = 'https://www.dnd5eapi.co';

/**
 * Fills the race traits div on a player character page.
 */
export const fillRaceTraitsDiv = async function() {
    const containerDiv = document.getElementById('race-traits-container');
    
    const elements = await getRaceTraitsSectionElements();

    elements.forEach(function(element) {
        containerDiv.appendChild(element);
    });
}

/**
 * Gets all elements that should be put in the race traits section on a PC page.
 * @returns {HTMLElement[]}
 */
const getRaceTraitsSectionElements = async function() {

    let elements = [];

    elements.push(getHeadingElement());

    const playerCharacterObject = window.currentObject;
    const raceTraits = await getRaceTraits(playerCharacterObject.race);
    
    const detailPromises = raceTraits.map(raceTrait => getRaceTraitsDetails(raceTrait));
    const resolvedDetails = await Promise.all(detailPromises);

    elements.push(...resolvedDetails);

    return elements;
}

/**
 * Gets a details-summary element for a singular race trait.
 * @param {json} raceTrait 
 * @returns {HTMLDetailsElement}
 */
const getRaceTraitsDetails = async function(raceTrait) {

    const details = document.createElement('details');
    const summary = document.createElement('summary');

    summary.appendChild(getTraitHeadingElement(raceTrait.name));

    details.appendChild(summary);

    const paragraphs = await getRaceTraitDescription(raceTrait.url);
    paragraphs.forEach(paragraph => {
        details.appendChild(paragraph);
    })

    return details;
}

/**
 * Gets the heading (h2) element for the race traits section.
 * @returns {HTMLHeadingElement}
 */
const getHeadingElement = function() {
    const h2 = document.createElement('h2');
    h2.textContent = "Ras eigenschappen";

    return h2;
}

/**
 * Gets the heading (h3) element for an individual race trait section.
 * @returns {HTMLHeadingElement}
 */
const getTraitHeadingElement = function(textContent) {
    const h3 = document.createElement('h3');
    h3.textContent = textContent;

    return h3;
}

/**
 * Gets the description of a race trait.
 * @param {string} url 
 * @returns {HTMLParagraphElement[]}
 */
const getRaceTraitDescription = async function(url){
    const raceTrait = await getRaceTrait(url);

    let paragraphs = [];

    raceTrait.desc.forEach(d => { 
        const paragraph = document.createElement('p');
        paragraph.textContent = d;
        paragraphs.push(paragraph);
    })

    return paragraphs;
}

/**
 * Get all race traits that belong to the given race.
 * Do this via API.
 * @param {string} raceName 
 * @returns {json[]}
 */
const getRaceTraits = async function(raceName) {
    
    const url = `${baseUrl}/api/races/${raceName.toLowerCase()}`;

    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json.traits;
    }
    catch (error) {
        console.error(error.message);
    }
}

/**
 * Get info about a specific race trait.
 * Do this via API.
 * @param {string} relativeUrl 
 * @returns {JSON}
 */
const getRaceTrait = async function (relativeUrl) {
    
    const url = baseUrl + relativeUrl;

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