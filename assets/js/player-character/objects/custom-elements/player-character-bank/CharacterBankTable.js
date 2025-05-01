import { getElementWithTextContent } from "../../../util.js";
import { PlayerCharacterBankEntry } from "../../PlayerCharacterBank.js";
import { CharacterExportButton } from "./CharacterExportButton.js";
import { CharacterResetButton } from "./CharacterResetButton.js";
import { CharacterSelectButton } from "./CharacterSelectButton.js";

export class CharacterBankTable extends HTMLTableElement {

    /**
     *
     * @param {PlayerCharacterBankEntry[]} playerCharacters
     * @param {boolean} isForCurrentCharacter
     */
    constructor(playerCharacters, isForCurrentCharacter) {
        super();

        this.playerCharacters = playerCharacters;
        this.isForCurrentCharacter = isForCurrentCharacter;
        
        this.caption = getElementWithTextContent("caption", isForCurrentCharacter ? "Selected character" : "Character storage");
        this.tableHeading = this.getTableHeading();
        this.tableBody = this.getTableBody();

        this.appendChild(this.caption);
        this.appendChild(this.tableHeading);
        this.appendChild(this.tableBody);
    }

    getTableHeading() {
        const heading = document.createElement("thead");

        const row = document.createElement('tr');

        row.appendChild(getElementWithTextContent("th", "Buttons"));
        row.appendChild(getElementWithTextContent("th", "Name"));
        row.appendChild(getElementWithTextContent("th", this.getCsv("Race", "subcrace")));
        row.appendChild(getElementWithTextContent("th", this.getCsv("Class", "level")));

        heading.appendChild(row);

        return heading;
    }

    /**
     * 
     */
    getTableBody() {
        const body = document.createElement('tbody');

        const sortedCharacters = this.playerCharacters.sort((a, b) => b.lastEdit - a.lastEdit);

        for (const playerCharacter of sortedCharacters) {
            body.appendChild(this.getTableRow(playerCharacter));
        }

        return body;
    }

    /**
     * 
     * @param {PlayerCharacterBankEntry} playerCharacterEntry 
     */
    getTableRow(playerCharacterEntry) {
        const row = document.createElement('tr');

        const playerCharacter = playerCharacterEntry.playerCharacter;

        row.appendChild(this.getButtonsRow(playerCharacterEntry));
        row.appendChild(getElementWithTextContent('td', playerCharacter.name));
        row.appendChild(getElementWithTextContent('td', this.getCsv(playerCharacter.race, playerCharacter.subrace)));
        row.appendChild(getElementWithTextContent('td', playerCharacter.classes.map(classObject => this.getCsv(classObject.index, classObject.level))));

        return row;
    }

    /**
     * 
     * @param {PlayerCharacterBankEntry} playerCharacterEntry 
     */
    getButtonsRow(playerCharacterEntry) {

        const td = document.createElement('td');

        td.appendChild(new CharacterExportButton(playerCharacterEntry.id));

        if (!this.isForCurrentCharacter) {
            td.appendChild(new CharacterResetButton(playerCharacterEntry.id));
            td.appendChild(new CharacterSelectButton(playerCharacterEntry.id));
        }

        return td;
    }

    getCsv(str1, str2) {
        return `${str1}, ${str2}`;
    }
}

customElements.define('character-bank-table', CharacterBankTable, { extends: 'table' });