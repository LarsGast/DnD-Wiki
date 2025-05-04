import { getElementWithTextContent } from "../../../util.js";
import { PlayerCharacterBankEntry } from "../../PlayerCharacterBank.js";
import { CharacterExportButton } from "./CharacterExportButton.js";
import { CharacterDeleteButton } from "./CharacterDeleteButton.js";
import { CharacterSelectButton } from "./CharacterSelectButton.js";
import { globalPlayerCharacterBank } from "../../../load-page.js";
import { PlayerCharacter } from "../../PlayerCharacter.js";
import { Race } from "../../api/resources/Race.js";
import { Subrace } from "../../api/resources/Subrace.js";
import { Class } from "../../api/resources/Class.js";
import { Subclass } from "../../api/resources/Subclass.js";

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
        this._updateHandler = async () => await this.updateTableBody();
        document.addEventListener("manageCharactersDialogOpened", this._updateHandler);

        if (!this.isForCurrentCharacter) {
            document.addEventListener("newCharacterCreated", this._updateHandler);
            document.addEventListener("characterImported", this._updateHandler);
            document.addEventListener("playerCharacterDeleted", this._updateHandler);
        }
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
    async updateTableBody() {
        this.tableBody.replaceChildren();

        const playerCharacters = this.getPlayerCharactersForTable();

        const sortedCharacters = playerCharacters.sort((a, b) => b.lastEdit - a.lastEdit);
        for (const playerCharacter of sortedCharacters) {
            this.tableBody.appendChild(await this.getTableRow(playerCharacter));
        }
    }

    getPlayerCharactersForTable() {
        if (this.isForCurrentCharacter) {
            return [globalPlayerCharacterBank.getActivePlayerCharacterBankEntry()];
        }
        else {
            return globalPlayerCharacterBank.getInactivePlayerCharacterBankEntries();
        }
    }

    /**
     * 
     * @param {PlayerCharacterBankEntry} playerCharacterEntry 
     */
    async getTableRow(playerCharacterEntry) {
        const row = document.createElement('tr');

        const playerCharacter = playerCharacterEntry.playerCharacter;

        row.appendChild(this.getButtonsRow(playerCharacterEntry));
        row.appendChild(getElementWithTextContent('td', playerCharacter.name));
        row.appendChild(getElementWithTextContent('td', await this.getRaceSubraceColumnValue(playerCharacter)));
        row.appendChild(getElementWithTextContent('td', await this.getClassLevelColumnValue(playerCharacter)));

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
    async getRaceSubraceColumnValue(playerCharacter) {
        if (!playerCharacter.race) {
            return 'Not selected';
        }

        const race = await Race.getAsync(playerCharacter.race);

        let value = race.name;
        if (playerCharacter.subrace) {
            const subrace = await Subrace.getAsync(playerCharacter.subrace);
            value += `, ${subrace.name}`;
        }

        return value;
    }

    /**
     * 
     * @param {PlayerCharacter} playerCharacter 
     */
    async getClassLevelColumnValue(playerCharacter) {

        if (playerCharacter.classes.length === 0) {
            return "Not selected";
        }

        const values = await Promise.all(playerCharacter.classes.map(classObject => this.getClassSubclassLevelValue(classObject)));

        return values.join(', ');
    }

    /**
     * 
     * @param {object} classObject 
     */
    async getClassSubclassLevelValue(classObject) {

        const classApiObject = await Class.getAsync(classObject.index);

        let value = `${classApiObject.name} ${classObject.level}`;
        if (classObject.subclass) {
            const subclass = await Subclass.getAsync(classObject.subclass);
            value += ` (${subclass.name})`;
        }

        return value;
    }
}

customElements.define('character-bank-table', CharacterBankTable, { extends: 'table' });