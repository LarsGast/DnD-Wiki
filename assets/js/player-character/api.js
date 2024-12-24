const baseUrl = 'https://www.dnd5eapi.co';

/**
 * Get all race names in the SRD.
 * @returns {string[]}
 */
export const getAllRaceNamesAsync = async function() {
    const url = `${baseUrl}/api/races`;
    const json = await getApiDataAsync(url);
    return json.results.map(result => result.name);
}

/**
 * Perform an API call and get data from https://www.dnd5eapi.co.
 * @param {string} url 
 * @returns {json}
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