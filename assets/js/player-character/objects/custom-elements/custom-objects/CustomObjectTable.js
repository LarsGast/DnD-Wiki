import { getElementWithTextContent } from "../../../util.js";

export class CustomObjectTable extends HTMLTableElement {

    /**
     *
     */
    constructor() {
        super();
        
        this.tableCaption = getElementWithTextContent("caption", "Custom objects");
        this.tableHead = this.getTableHead();
        this.tableBody = this.getTableBody();

        this.appendChild(this.tableCaption);
        this.appendChild(this.tableHead);
        this.appendChild(this.tableBody);
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

    getTableBody() {
        const body = document.createElement('tbody');

        const customObjects = [{name: "test", type: "test"}];

        for (const customObject of customObjects) {
            body.appendChild(this.getTableBodyRow(customObject));
        }

        return body;
    }

    getTableBodyRow(customObject) {

        const row = document.createElement('tr');

        row.appendChild(this.getButtonsColumnValue(customObject));
        row.appendChild(getElementWithTextContent('td', customObject.name));
        row.appendChild(getElementWithTextContent('td', customObject.type));

        return row;
    }

    getButtonsColumnValue(customObject) {
        const td = document.createElement('td');

        td.appendChild(document.createTextNode("Edit"));
        td.appendChild(document.createTextNode("Export"));
        td.appendChild(document.createTextNode("Delete"));

        return td;
    }
}

customElements.define('custom-object-table', CustomObjectTable, { extends: 'table' });