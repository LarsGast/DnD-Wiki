const getRelatedCharacters = function(characterName) {
    let characterLinks = window.characterLinks;

    let relatedCharacterLinks = characterLinks.filter(characterLink => 
        characterLink.firstCharacterName === characterName ||
        characterLink.secondCharacterName === characterName);
    
    let relatedCharacterNames = relatedCharacterLinks.map(characterLink => characterLink.firstCharacterName)
        .concat(relatedCharacterLinks.map(characterLink => characterLink.secondCharacterName))
        .filter(name => name !== characterName);
    
    relatedCharacterNames = [...new Set(relatedCharacterNames)];    
    
    let charactersData = window.charactersData;

    let relatedCharacters = charactersData.filter(character => 
        relatedCharacterNames.includes(character.name)
    );

    return relatedCharacters;
}

document.addEventListener("DOMContentLoaded", function() {
    let currentObject = window.currentObject;

    let relatedCharacters = getRelatedCharacters(currentObject);

    const uList = document.getElementsByClassName('character-list')[0];

    relatedCharacters.forEach(function(character) {
        let listItem = document.createElement('li');
        uList.appendChild(listItem);

        let link = document.createElement('a');
        link.href = `../characters/${character.name}`;
        listItem.appendChild(link);

        let summaryWrapper = document.createElement('div');
        summaryWrapper.className = 'character-summary-wrapper';
        link.appendChild(summaryWrapper);

        let header = document.createElement('h2');
        header.textContent = character.name;
        summaryWrapper.appendChild(header);

        let icons = document.createElement('div');
        icons.className = 'character-icons';
        summaryWrapper.appendChild(icons);

        character.icons.forEach(function(icon) {
            let iconSpan = document.createElement('span');
            iconSpan.classList = `icon ${icon.name}`;

            iconSpan.title = window.icons.filter(i => i.name === icon.name)[0].description;

            icons.appendChild(iconSpan);
        });
    });
});