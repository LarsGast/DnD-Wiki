import { Race } from "../../api/resources/Race.js";
import { globalPlayerCharacter } from "../../PlayerCharacter.js";

export class RaceFeaturesDisplay extends HTMLDetailsElement {

    constructor() {
        super();
    }
    
    connectedCallback() {
        // Update immediately.
        this.updateDisplay();
        // Listen for global updates.
        this._updateHandler = (event) => this.updateDisplay(event);
        document.addEventListener("raceUpdated", this._updateHandler);
    }
    
    disconnectedCallback() {
        document.removeEventListener("raceUpdated", this._updateHandler);
    }

    async updateDisplay(event) {
        if (this.getShouldUpdate(event)) {
            await this.updateRaceFeaturesDisplay();
        }
    }

    /**
     * 
     * @param {CustomEvent} event 
     */
    getShouldUpdate(event) {
        return !event || 
            (event.type === "raceUpdated");
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

    async updateRaceFeaturesDisplay() {
        this.race = await Race.getAsync(globalPlayerCharacter.race);

        this.replaceChildren();

        this.appendChild(this.getSectionHeading());

        this.appendChild(this.getHeading("Ability Bonuses"));
        this.appendChild(this.getAbilityBonusBody());

        this.appendChild(this.getHeading("Speed"));
        this.appendChild(this.getParagraph(this.race.speed));
        
        this.appendChild(this.getHeading("Alignment"));
        this.appendChild(this.getParagraph(this.race.alignment));
        
        this.appendChild(this.getHeading("Age"));
        this.appendChild(this.getParagraph(this.race.age));
        
        this.appendChild(this.getHeading("Size"));
        this.appendChild(this.getParagraph(this.race.size_description));
        
        this.appendChild(this.getHeading("Languages"));
        this.appendChild(this.getParagraph(this.race.language_desc));
        
        const traits = await this.race.getAllTraitsAsync();
        if (traits.length > 0) {
            this.appendChild(this.getTraitsSection());
        }
    }

    getSectionHeading() {
        const summary = document.createElement('summary');

        const heading = document.createElement('h2');

        heading.textContent = `Race features (${this.getRaceName()})`;

        summary.appendChild(heading);

        return summary;
    }

    getRaceName() {
        if (this.race) {
            return this.race.name;
        }

        return "choose race";
    }

    getAbilityBonusBody() {
        const ul = document.createElement('ul');

        for (const abilityBonus of this.race.ability_bonuses) {
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

customElements.define('race-features-display', RaceFeaturesDisplay, { extends: 'details' });