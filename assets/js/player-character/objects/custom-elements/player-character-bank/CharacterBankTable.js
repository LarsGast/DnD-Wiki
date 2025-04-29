import { getElementWithTextContent } from "../../../util.js";
import { PlayerCharacter } from "../../PlayerCharacter.js";

export class CharacterBankTable extends HTMLTableElement {

    /**
     *
     * @param {PlayerCharacter[]} playerCharacters
     */
    constructor(playerCharacters) {
        super();
        
        this.tableHeading = this.getTableHeading();
        this.tableBody = this.getTableBody(playerCharacters);

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
     * @param {PlayerCharacter[]} playerCharacters 
     */
    getTableBody(playerCharacters) {
        const body = document.createElement('tbody');

        for (const playerCharacter of playerCharacters) {
            body.appendChild(this.getTableRow(playerCharacter));
        }

        return body;
    }

    /**
     * 
     * @param {PlayerCharacter} playerCharacter 
     */
    getTableRow(playerCharacter) {
        const row = document.createElement('tr');

        row.appendChild(getElementWithTextContent('td', "Here be buttons"));
        row.appendChild(getElementWithTextContent('td', playerCharacter.name));
        row.appendChild(getElementWithTextContent('td', this.getCsv(playerCharacter.race, playerCharacter.subrace)));
        row.appendChild(getElementWithTextContent('td', playerCharacter.classes.map(classObject => this.getCsv(classObject.index, classObject.level))));

        return row;
    }

    getCsv(str1, str2) {
        return `${str1}, ${str2}`;
    }
}

customElements.define('character-bank-table', CharacterBankTable, { extends: 'table' });