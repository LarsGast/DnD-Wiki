import { Background } from "../../api/resources/Background.js";
import { getEmptyOption, getSelectOption } from "../../../util.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class BackgroundInput extends HTMLSelectElement {
    
    constructor() {
        super();

        this.onchange = () => this.handleChange();
    }

    async connectedCallback() {
        const allBackgrounds = await Background.getAllAsync();

        this.appendChild(getEmptyOption());

        for (const background of allBackgrounds.results) {
            this.appendChild(getSelectOption(background.name, background.index));
        }

        this.value = globalPlayerCharacter.background;
    }

    handleChange() {

        globalPlayerCharacter.setProperty('background', this.value);

        document.dispatchEvent(new Event("backgroundUpdated"));
    }
}

customElements.define('background-input', BackgroundInput, { extends: 'select' });