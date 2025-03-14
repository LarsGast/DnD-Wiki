---
layout: page
title: PC Builder
permalink: /pc-builder/
---

<section>
    <details>
        <summary>
            <h2>Info</h2>
        </summary>
        <p>
            Op deze pagina kun je je eigen <abbr title="Player Character">PC</abbr> maken zoals je dit ook op een papieren character sheet zou doen. Aangezien deze "character sheet" niet op fysiek papier is, kunnen we gebruik maken van technieken om de ervaring wat te stroomlijnen. Zo worden de skills van je karakter op deze pagina automatisch uitgerekend op basis van je ability scores, level, en proficiency/ expertise. Daarnaast heb je op het internet veel meer ruimte om dingen op te slaan dan een paar stukken A4 papier.
        </p>
        <p>
            Hieronder wordt wat dieper in gegaan op een paar specificaties van deze pagina. Door deze te lezen begrijp je mogelijk beter wat het idee achter de pagina is en wat de mogelijke uitbreidingen en limitaties zijn.
        </p>
        <h3>localStorage</h3>
        <p>
            Voor het opslaan van de data op deze pagina wordt <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank">localStorage</a> gebruikt. Dit is een techniek waarmee data lokaal in de client opgeslagen kan worden. Dit zorgt er in de praktijk voor dat iedereen die deze pagina bezoekt een unieke set aan data heeft, en dat de data die jij op deze pagina ziet alleen voor jou beschikbaar is. Dit zorgt er ook voor dat de data op jouw computer anders is dan bijvoorbeeld op je telefoon. Er zijn plannen om een export-import functionaliteit te maken waardoor je data over meerdere machines beschikbaar kunt stellen.
        </p>
        <h3>DnD API</h3>
        <p>
            Voor class, race, background, en alignment wordt de <a href="https://www.dnd5eapi.co/" target="_blank">DnD 5e API</a> gebruikt. Deze API bevat alle gratis content van D&D 5e, <a href="https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf" target="_blank">de <abbr title="Systems Reference Document">SRD</abbr></a>. Dit is een subset van het <abbr title="Player's Handbook">PHB</abbr>, wat inhoud dat niet alle content hier beschikbaar is (dit bevat bijvoorbeeld maar 1 background). Er zijn op dit moment geen plannen om dit uit te breiden, omdat je dan met copyright law bezig bent.
        </p>
        <h3>Geplande componenten</h3>
        <p>
            Naast de componenten die je al op deze pagina ziet, zijn er plannen voor uitbreidingen. Hieronder zie je een lijst met een aantal geplande onderdelen. Als je zelf voorstellen hebt over uitbreidingen, hoor ik dit graag.
        </p>
        <ul>
            <li>HP, AC, initiative, en speed</li>
            <li>Saving throws</li>
            <li>Class features</li>
            <li>Spell casting</li>
            <li>Talen</li>
            <li>
                Inventory, onderverdeeld in
                <ul>
                    <li>Magische items</li>
                    <li>Potions</li>
                    <li>Goud</li>
                    <li>Misc</li>
                </ul>
            </li>
            <li>
                Proficiencies in items
            </li>
        </ul>
    </details>
</section>

<section id="export-import-container">
    <button id="reset-button" type="button">Reset</button>
    <button id="export-button" type="button">Export</button>
    <button id="import-button" type="button">Import</button>
</section>

<section id="generic-info-container">
    <h2>Algemeen</h2>
    <ul>
        <li><label>Name: <input id="name_i"/></label></li>
        <li>
            <label>Class & Level: </label><button id="class-and-level_b" type="button">Add class</button>
            <ul id="class-and-level-list"></ul>
        </li>
        <li><label>Race: <select id="race_s"></select></label></li>
        <li><label>Subrace: <select id="subrace_s"></select></label></li>
        <li><label>Background: <select id="background_s"></select></label></li>
        <li><label>Alignment: <select id="alignment_s"></select></label></li>
    </ul>
</section>

<section id="ability-scores-container">
    <h2>Ability Scores</h2>
    <ul class="no-style-list" id="ability-scores-list">
        <li id="str">
            <span>STR</span>
            <span id="str_m"></span>
            <input id="str_i" type="number" min="1" max="30"/>
        </li>
        <li id="dex">
            <span>DEX</span>
            <span id="dex_m"></span>
            <input id="dex_i" type="number" min="1" max="30"/>
        </li>
        <li id="con">
            <span>CON</span>
            <span id="con_m"></span>
            <input id="con_i" type="number" min="1" max="30"/>
        </li>
        <li id="int">
            <span>INT</span>
            <span id="int_m"></span>
            <input id="int_i" type="number" min="1" max="30"/>
        </li>
        <li id="wis">
            <span>WIS</span>
            <span id="wis_m"></span>
            <input id="wis_i" type="number" min="1" max="30"/>
        </li>
        <li id="cha">
            <span>CHA</span>
            <span id="cha_m"></span>
            <input id="cha_i" type="number" min="1" max="30"/>
        </li>
    </ul>
</section>

<section id="skills-container">
    <h2>Skills</h2>
    <ul class="no-style-list proficiencies-list three-columns-list" id="skills-list"></ul>
</section>

<section id="equipment-proficiencies-container">
    <details>
        <summary><h2>Equipment proficiencies</h2></summary>
        <details>
            <summary><h3>Weapons</h3></summary>
            <div id="weapon-proficiencies-container"></div>
        </details>
        <details>
            <summary><h3>Armor</h3></summary>
            <div id="armor-proficiencies-container"></div>
        </details>
    </details>
</section>

<section id="inventory-container">
    <details>
        <summary><h2>Inventory</h2></summary>
        <h3>Weapons</h3>
        <button id="add-weapon-button" type="button" disabled>Add weapon</button>
        <select id="weapon-select"></select>
        <div class="table-container">
            <table id="weapons-table">
                <thead>
                    <tr>
                        <th id="weapon_name">Name</th>
                        <th id="weapon_ability">Ability</th>
                        <th id="weapon_attack-bonus">Attack bonus</th>
                        <th id="weapon_damage">Damage</th>
                        <th id="weapon_damage-type">Damage type</th>
                        <th id="weapon_range">Range</th>
                        <th id="weapon_weight">Weight</th>
                        <th id="weapon_buttons">Buttons</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <h3>Armor</h3>
        <button id="add-armor-button" type="button" disabled>Add armor</button>
        <select id="armor-select"></select>
        <div class="table-container">
            <table id="armor-table">
                <thead>
                    <tr>
                        <th id="armor_name">Name</th>
                        <th id="armor_type">Type</th>
                        <th id="armor_strength-requirement">Strength</th>
                        <th id="armor_disadvantage-on-stealth">Stealth</th>
                        <th id="armor_armor-class">Armor class</th>
                        <th id="armor_effective-armor-class">Effective armor class</th>
                        <th id="armor_weight">Weight</th>
                        <th id="armor_buttons">Buttons</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </details>
</section>

<section id="race-features">
    <details>
        <summary><h2>Race features (<span id="race_name">choose race</span>)</h2></summary>
        <h3>Ability Bonuses</h3>
        <ul id="race_ability_bonuses"></ul>
        <h3>Speed</h3>
        <p id="race_speed"></p>
        <h3>Alignment</h3>
        <p id="race_alignment"></p>
        <h3>Age</h3>
        <p id="race_age"></p>
        <h3>Size</h3>
        <p id="race_size"></p>
        <h3>Languages</h3>
        <p id="race_languages"></p>
        <h3>Traits</h3>
        <div id="race_traits"></div>
    </details>
</section>

<section id="subrace-features">
    <details>
        <summary><h2>Subrace features (<span id="subrace_name"></span>)</h2></summary>
        <h3>Description</h3>
        <p id="subrace_description"></p>
        <h3>Ability Bonuses</h3>
        <ul id="subrace_ability_bonuses"></ul>
        <h3>Traits</h3>
        <div id="subrace_traits"></div>
    </details>
</section>

<section id="notes-container">
    <h2>Notes</h2>
    <textarea id="notes"></textarea>
</section>

<div id="dialogs">
    <dialog id="reset-dialog">
        <div class="dialog-content">
            <button class="close" type="button">Close</button>
            <h2>Reset PC</h2>
            <p>By resetting the PC, you will set the page to the same state it was when you loaded the page for the first time. All data will be removed and default values will be assigned to each property.</p>
            <p><strong>Warning: resetting the page will remove all data. Export the data first to create a backup if you do not want to lose any data.</strong></p>
            <button class="reset" type="button">Reset</button>
        </div>
    </dialog>
    <dialog id="export-dialog">
        <div class="dialog-content">
            <button class="close" type="button">Close</button>
            <h2>Export PC</h2>
            <p>Use this window to download all information needed to build the PC Builder page. You can use this feature to save backups, move characters between devices, and more.</p>
            <p>Use the <code>Import</code> button to import the information into the page using the resulting JSON file from this export.</p>
            <div>
                <button class="download" type="button">Download</button>
                <label for="export-preview">Preview</label>
            </div>
            <textarea id="export-preview" disabled></textarea>
        </div>
    </dialog>
    <dialog id="import-dialog">
        <div class="dialog-content">
            <button class="close" type="button">Close</button>
            <h2>Import PC</h2>
            <p>Use this window to import all information needed to build the PC Builder page. Only the data provided by an export should be used while importing. Using anything else may result in loss of data. Create a backup of the current data by exporting it before importing new data to prevent overwriting existing data.</p>
            <p>Select a JSON file below, then press the <code>Import</code> button to import the data.</p>
            <div>
                <button class="import" type="button" disabled>Import</button>
                <input class="load" type="file"/>
                <label for="import-preview">Preview</label>
            </div>
            <textarea id="import-preview" disabled></textarea>
        </div>
    </dialog>
</div>

<script type="module">
    import { loadPage } from "{{ '/assets/js/player-character/load-page.js' | relative_url }}";
    await loadPage();
</script>