import { ApiCategory } from "../../../api.js";
import { globals } from "../../../load-globals.js";
import { getElementWithTextContent } from "../../../util.js";
import { CustomObjectBankEntry } from "../../CustomObjectBank.js";
import { CustomObjectDeleteButton } from "./CustomObjectDeleteButton.js";
import { CustomObjectEditButton } from "./CustomObjectEditButton.js";
import { CustomObjectExportButton } from "./CustomObjectExportButton.js";

export class CustomObjectTable extends HTMLTableElement {

    /**
     *
     */
    constructor() {
        super();
        
        this.tableCaption = getElementWithTextContent("caption", "Custom objects");
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

        document.addEventListener("manageCustomObjectsDialogOpened", this._updateHandler);
        document.addEventListener("newCustomObjectCreated", this._updateHandler);
        document.addEventListener("customObjectDeleted", this._updateHandler);
    }
    
    /**
     * Called when the element is disconnected from the DOM.
     * Removes the event listeners.
     */
    disconnectedCallback() {
        document.removeEventListener("manageCustomObjectsDialogOpened", this._updateHandler);
        document.removeEventListener("newCustomObjectCreated", this._updateHandler);
        document.removeEventListener("customObjectDeleted", this._updateHandler);
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

        const customObjectEntry = globals.customObjectBank.customObjectBankEntries;

        // Sort them from last edited -> first edited, so the most used custom objects are generally at the top.
        const sortedEntries = customObjectEntry.sort((a, b) => b.lastEdit - a.lastEdit);

        for (const entry of sortedEntries) {
            this.tableBody.appendChild(this.getTableBodyRow(entry));
        }
    }

    /**
     * 
     * @param {CustomObjectBankEntry} entry 
     * @returns 
     */
    getTableBodyRow(entry) {

        const row = document.createElement('tr');

        row.appendChild(this.getButtonsColumnValue(entry));
        row.appendChild(getElementWithTextContent('td', entry.customObject.name));
        row.appendChild(getElementWithTextContent('td', new ApiCategory(entry.apiCategoryName).getSingularName()));

        return row;
    }

    /**
     * 
     * @param {CustomObjectBankEntry} entry 
     * @returns 
     */
    getButtonsColumnValue(entry) {
        const td = document.createElement('td');

        td.appendChild(new CustomObjectEditButton(entry.id));
        td.appendChild(new CustomObjectExportButton(entry.id));
        td.appendChild(new CustomObjectDeleteButton(entry.id));

        return td;
    }
}

customElements.define('custom-object-table', CustomObjectTable, { extends: 'table' });