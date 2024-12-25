---
layout: page
title: PC Builder
permalink: /pc-builder/
---

<section id="generic-info-container">
    <h2>Algemeen</h2>
    <ul>
        <li><label>Name: <input id="name_i"/></label></li>
        <li>
            <label>Class & Level: </label><button id="class-and-level_b" type="button">Add class</button>
            <ul id="class-and-level-list"></ul>
        </li>
        <li><label>Race: <select id="race_s"></select></label></li>
        <li><label>Background: <select id="background_s"></select></label></li>
        <li><label>Alignment: <select id="alignment_s"></select></label></li>
    </ul>
</section>

<section id="ability-scores-container">
    <h2>Ability Scores</h2>
    <ul class="no-style-list" id="ability-scores-list">
    <li id="strength">
            <span>STR</span>
            <span id="strength_m"></span>
            <input id="strength_i" type="number" min="1" max="30"/>
        </li>
        <li id="dexterity">
            <span>DEX</span>
            <span id="dexterity_m"></span>
            <input id="dexterity_i" type="number" min="1" max="30"/>
        </li>
        <li id="constitution">
            <span>CON</span>
            <span id="constitution_m"></span>
            <input id="constitution_i" type="number" min="1" max="30"/>
        </li>
        <li id="intelligence">
            <span>INT</span>
            <span id="intelligence_m"></span>
            <input id="intelligence_i" type="number" min="1" max="30"/>
        </li>
        <li id="wisdom">
            <span>WIS</span>
            <span id="wisdom_m"></span>
            <input id="wisdom_i" type="number" min="1" max="30"/>
        </li>
        <li id="charisma">
            <span>CHA</span>
            <span id="charisma_m"></span>
            <input id="charisma_i" type="number" min="1" max="30"/>
        </li>
    </ul>
</section>

<section id="skills-container">
    <h2>Skills</h2>
    <ul class="no-style-list" id="skills-list"></ul>
</section>

<section id="notes-container">
    <h2>Notes</h2>
    <textarea id="notes"></textarea>
</section>

<script type="module">
    import { fillGenericInfoElements } from "{{ '/assets/js/player-character/generic-info.js' | relative_url }}";
    import { fillSkillsList } from "{{ '/assets/js/player-character/skills.js' | relative_url }}";
    import { initPage } from "{{ '/assets/js/player-character/init-page.js' | relative_url }}";

    const genericInfoPromise = fillGenericInfoElements();

    window.skills = {{ site.data.skills | jsonify }};

    fillSkillsList({{ site.data.skills | jsonify }});

    await genericInfoPromise;
    initPage();
</script>