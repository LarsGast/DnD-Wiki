import { Race } from "../../api/resources/Race.js";
import { Subrace } from "../../api/resources/Subrace.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class SubraceFeaturesDisplay extends HTMLDetailsElement {

    constructor() {
        super();
    }
    
    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("subraceUpdated", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("subraceUpdated", this._updateHandler);
    }

    async updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            await this.updateSubraceFeaturesDisplay();
        }
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    getShouldUpdate(event) {
        return !event || 
            (event.type === "subraceUpdated");
    }

    getHeading(title) {
        const heading = document.createElement('h3');

        heading.textContent = title;

        return heading;
    }

    getParagraph(body) {
        const p = document.createElement('p');

        p.textContent = body;

        return p;
    }

    async updateSubraceFeaturesDisplay() {

        if (!globalPlayerCharacter.subrace) {
            this.style.display = "none";
            return;
        }
        
        this.style.display = "block";
        
        this.subrace = await Subrace.getAsync(globalPlayerCharacter.subrace);

        this.replaceChildren();

        this.appendChild(this.getSectionHeading());

        this.appendChild(this.getHeading("Description"));
        this.appendChild(this.getParagraph(this.subrace.desc));

        this.appendChild(this.getHeading("Ability Bonuses"));
        this.appendChild(this.getAbilityBonusBody());
        
        const traits = await this.subrace.getAllTraitsAsync();
        if (traits.length > 0) {
            this.appendChild(this.getTraitsSection(traits));
        }
    }

    getSectionHeading() {
        const summary = document.createElement('summary');

        const heading = document.createElement('h2');

        heading.textContent = `Subrace features (${this.getSubraceName()})`;

        summary.appendChild(heading);

        return summary;
    }

    getSubraceName() {
        if (this.subrace) {
            return this.subrace.name;
        }

        return "choose subrace";
    }

    getAbilityBonusBody() {
        const ul = document.createElement('ul');

        for (const abilityBonus of this.subrace.ability_bonuses) {
            const li = document.createElement('li');

            li.textContent = `${abilityBonus.ability_score.name} + ${abilityBonus.bonus}`;

            ul.appendChild(li)
        }

        return ul;
    }

    getTraitHeading(title) {
        const heading = document.createElement('h4');

        heading.textContent = title;

        return heading;
    }

    getTraitsSection(traits) {

        const traitsSection = document.createElement('section');

        traitsSection.appendChild(this.getHeading("Traits"));

        for (const trait of traits) {
            traitsSection.appendChild(this.getTraitHeading(trait.name));

            for (const traitDesc of trait.desc) {
                traitsSection.appendChild(this.getParagraph(traitDesc));
            }
        }

        return traitsSection;
    }
}

customElements.define('subrace-features-display', SubraceFeaturesDisplay, { extends: 'details' });