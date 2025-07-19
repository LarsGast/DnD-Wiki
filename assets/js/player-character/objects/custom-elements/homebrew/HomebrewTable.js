import { ApiCategory } from "../../../api.js";
import { globals } from "../../../load-globals.js";
import { getElementWithTextContent } from "../../../util.js";
import { HomebrewBankEntry } from "../../HomebrewBank.js";
import { HomebrewDeleteButton } from "./HomebrewDeleteButton.js";
import { HomebrewEditButton } from "./HomebrewEditButton.js";
import { HomebrewExportButton } from "./HomebrewExportButton.js";

export class HomebrewTable extends HTMLTableElement {

    /**
     *
     */
    constructor() {
        super();
        
        this.tableCaption = getElementWithTextContent("caption", "Homebrew objects");
        this.tableHead = this.getTableHead();

        // Empty body, will be filled on events.
        this.tableBody = document.createElement('tbody');

        this.appendChild(this.tableCaption);
        this.appendChild(this.tableHead);
        this.appendChild(this.tableBody);
    }

    /**
     * Called when the element is connected to the DOM.
     * Listens for events to update the body of the table.
     */
    connectedCallback() {
        this._updateHandler = async () => this.updateTableBody();

        document.addEventListener("manageHomebrewDialogOpened", this._updateHandler);
        document.addEventListener("newHomebrewCreated", this._updateHandler);
        document.addEventListener("homebrewImported", this._updateHandler);
        document.addEventListener("homebrewDeleted", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listeners.
     */
    disconnectedCallback() {
        document.removeEventListener("manageHomebrewDialogOpened", this._updateHandler);
        document.removeEventListener("newHomebrewCreated", this._updateHandler);
        document.removeEventListener("homebrewImported", this._updateHandler);
        document.removeEventListener("homebrewDeleted", this._updateHandler);
    }

    getTableHead() {
        const head = document.createElement('thead');

        const row = document.createElement('tr');

        row.appendChild(getElementWithTextContent("th", "Buttons"));
        row.appendChild(getElementWithTextContent("th", "Name"));
        row.appendChild(getElementWithTextContent("th", "Type"));

        head.appendChild(row);

        return head;
    }

    updateTableBody() {
        this.tableBody.replaceChildren();

        const homebrewEntry = globals.homebrewBank.homebrewBankEntries;

        // Sort them from last edited -> first edited, so the most used homebrew objects are generally at the top.
        const sortedEntries = homebrewEntry.sort((a, b) => b.lastEdit - a.lastEdit);

        for (const entry of sortedEntries) {
            this.tableBody.appendChild(this.getTableBodyRow(entry));
        }
    }

    /**
     * 
     * @param {HomebrewBankEntry} entry 
     * @returns 
     */
    getTableBodyRow(entry) {

        const row = document.createElement('tr');

        row.appendChild(this.getButtonsColumnValue(entry));
        row.appendChild(getElementWithTextContent('td', entry.homebrewObject.name));
        row.appendChild(getElementWithTextContent('td', new ApiCategory(entry.apiCategoryName).getSingularName()));

        return row;
    }

    /**
     * 
     * @param {HomebrewBankEntry} entry 
     * @returns 
     */
    getButtonsColumnValue(entry) {
        const td = document.createElement('td');

        td.appendChild(new HomebrewEditButton(entry.id));
        td.appendChild(new HomebrewExportButton(entry.id));
        td.appendChild(new HomebrewDeleteButton(entry.id));

        return td;
    }
}

customElements.define('homebrew-object-table', HomebrewTable, { extends: 'table' });