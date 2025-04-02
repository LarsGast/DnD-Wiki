import { Alignment } from "../../api/resources/Alignment.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class AlignmentInput extends HTMLSelectElement {
    
    constructor() {
        super();

        this.onchange = () => this.handleChange();
    }

    async connectedCallback() {
        const allAlignments = await Alignment.getAllAsync();

        this.appendChild(getEmptyOption());

        for (const alignment of allAlignments.results) {
            this.appendChild(getSelectOption(alignment.name, alignment.index));
        }

        this.value = globalPlayerCharacter.alignment;
    }

    handleChange() {

        globalPlayerCharacter.setProperty('alignment', this.value);

        document.dispatchEvent(new Event("alignmentUpdated"));
    }
}

customElements.define('alignment-input', AlignmentInput, { extends: 'select' });