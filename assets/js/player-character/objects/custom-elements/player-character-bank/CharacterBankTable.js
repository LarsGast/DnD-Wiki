import { getElementWithTextContent } from "../../../util.js";
import { PlayerCharacterBankEntry } from "../../PlayerCharacterBank.js";
import { CharacterExportButton } from "./CharacterExportButton.js";
import { CharacterDeleteButton } from "./CharacterDeleteButton.js";
import { CharacterSelectButton } from "./CharacterSelectButton.js";
import { globalPlayerCharacterBank } from "../../../load-page.js";
import { PlayerCharacter } from "../../PlayerCharacter.js";

export class CharacterBankTable extends HTMLTableElement {

    /**
     *
     * @param {boolean} isForCurrentCharacter
     */
    constructor(isForCurrentCharacter) {
        super();

        this.isForCurrentCharacter = isForCurrentCharacter;
        
        this.caption = getElementWithTextContent("caption", isForCurrentCharacter ? "Selected character" : "Character storage");
        this.tableHeading = this.getTableHeading();
        this.tableBody = document.createElement('tbody');

        this.appendChild(this.caption);
        this.appendChild(this.tableHeading);
        this.appendChild(this.tableBody);
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for events to update the body of the table.
     */
    connectedCallback() {
        this._updateHandler = () => this.updateTableBody();
        document.addEventListener("manageCharactersDialogOpened", this._updateHandler);
        document.addEventListener("newCharacterCreated", this._updateHandler);
        document.addEventListener("characterImported", this._updateHandler);
        document.addEventListener("playerCharacterDeleted", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listeners.
     */
    disconnectedCallback() {
        document.removeEventListener("manageCharactersDialogOpened", this._updateHandler);
        document.removeEventListener("newCharacterCreated", this._updateHandler);
        document.removeEventListener("characterImported", this._updateHandler);
        document.removeEventListener("playerCharacterDeleted", this._updateHandler);
    }

    getTableHeading() {
        const heading = document.createElement("thead");

        const row = document.createElement('tr');

        row.appendChild(getElementWithTextContent("th", "Buttons"));
        row.appendChild(getElementWithTextContent("th", "Name"));
        row.appendChild(getElementWithTextContent("th", "Race"));
        row.appendChild(getElementWithTextContent("th", "Classes"));

        heading.appendChild(row);

        return heading;
    }

    /**
     * 
     */
    updateTableBody() {
        this.tableBody.replaceChildren();

        const playerCharacters = this.getPlayerCharactersForTable();

        const sortedCharacters = playerCharacters.sort((a, b) => b.lastEdit - a.lastEdit);
        for (const playerCharacter of sortedCharacters) {
            this.tableBody.appendChild(this.getTableRow(playerCharacter));
        }
    }

    getPlayerCharactersForTable() {
        if (this.isForCurrentCharacter) {
            return [globalPlayerCharacterBank.getActivePlayerCharacter()];
        }
        else {
            return globalPlayerCharacterBank.getInactivePlayerCharacters();
        }
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
        row.appendChild(getElementWithTextContent('td', this.getRaceSubraceColumnValue(playerCharacter)));
        row.appendChild(getElementWithTextContent('td', this.getClassLevelColumnValue(playerCharacter)));

        return row;
    }

    /**
     * 
     * @param {PlayerCharacterBankEntry} playerCharacterEntry 
     */
    getButtonsRow(playerCharacterEntry) {

        const td = document.createElement('td');

        if (!this.isForCurrentCharacter) {
            td.appendChild(new CharacterSelectButton(playerCharacterEntry.id));
        }

        td.appendChild(new CharacterExportButton(playerCharacterEntry.id));

        if (!this.isForCurrentCharacter) {
            td.appendChild(new CharacterDeleteButton(playerCharacterEntry.id));
        }

        return td;
    }

    /**
     * 
     * @param {PlayerCharacter} playerCharacter 
     */
    getRaceSubraceColumnValue(playerCharacter) {
        if (!playerCharacter.race) {
            return '';
        }

        let value = playerCharacter.race;
        if (playerCharacter.subrace) {
            value += `, ${playerCharacter.subrace}`;
        }

        return value;
    }

    /**
     * 
     * @param {PlayerCharacter} playerCharacter 
     */
    getClassLevelColumnValue(playerCharacter) {
        return playerCharacter.classes.map(classObject => this.getClassSubclassLevelValue(classObject)).join(', ');
    }

    /**
     * 
     * @param {object} classObject 
     */
    getClassSubclassLevelValue(classObject) {

        let value = `${classObject.index} ${classObject.level}`;
        if (classObject.subclass) {
            value += ` (${classObject.subclass})`;
        }

        return value;
    }
}

customElements.define('character-bank-table', CharacterBankTable, { extends: 'table' });