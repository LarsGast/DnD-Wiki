import { getElementWithTextContent } from "../../../util.js";
import { Spell } from "../../api/resources/Spell.js";

export class SpellDisplay extends HTMLElement {

    /**
     *
     */
    constructor() {
        super();

        this.spellIndex = "call-lightning";

        this.heading = document.createElement('h3');
        this.levelDescription = document.createElement('p');
        this.castingTime = document.createElement('p');
        this.range = document.createElement('p');
        this.components = document.createElement('p');
        this.duration = document.createElement('p');

        this.appendChild(this.heading);
        this.appendChild(this.levelDescription);
        this.appendChild(this.castingTime);
        this.appendChild(this.range);
        this.appendChild(this.components);
        this.appendChild(this.duration);
    }

    async connectedCallback() {
        this.spell = await Spell.getAsync(this.spellIndex);

        this.heading.textContent = this.spell.name;

        if (this.spell.level === 0) {
            this.levelDescription.textContent = `${this.spell.school.name} cantrip`;
        }
        else {
            this.levelDescription.textContent = `${this.getOrdinal(this.spell.level)}-level ${this.spell.school.name}`;
        }

        if (this.spell.ritual) {
            this.levelDescription.textContent += ' (ritual)';
        }

        this.castingTime.textContent = `Casting Time: ${this.spell.casting_time}`;
        this.range.textContent = `Range: ${this.spell.range}`;
        this.components.textContent = `Components: ${this.spell.components.join(', ')}`;

        let durationText = 'Duration: ';

        if (this.spell.concentration) {
            durationText += 'Concentration, ';
        }

        durationText += this.spell.duration;

        this.duration.textContent = durationText;

        for (const paragraph of this.spell.desc) {
            this.appendChild(getElementWithTextContent('p', paragraph));
        }
    }

    getOrdinal(number) {
        const ordinalSuffixes = ["th", "st", "nd", "rd"];
        const lastTwoDigits = number % 100;

        // Handle special cases like 11th, 12th, 13th
        if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
            return number + "th";
        }

        const lastDigit = number % 10;

        // Get appropriate suffix based on the last digit
        const suffix = ordinalSuffixes[lastDigit] || "th";

        return number + suffix;
    }
}

customElements.define('spell-display', SpellDisplay);