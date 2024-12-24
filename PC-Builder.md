---
layout: page
title: PC Builder
permalink: /pc-builder/
---

<script type="module">
    window.skills = {{ site.data.skills | jsonify }};
</script>

<section id="generic-info-container">
    <h2>Algemeen</h2>
    <ul>
        <li><label>Name: <input/></label></li>
        <li><label>Class & Level: <input/></label></li>
        <li><label>Race: <input/></label></li>
        <li><label>Background: <input/></label></li>
        <li><label>Alignment: <input/></label></li>
    </ul>
</section>

<section id="ability-scores-container">
    <h2>Ability Scores</h2>
    <ul class="no-style-list" id="ability-scores-list">
    <li id="strength">
            <span>STR</span>
            <span id="strength_m"></span>
            <input id="strength_i"/>
        </li>
        <li id="dexterity">
            <span>DEX</span>
            <span id="dexterity_m"></span>
            <input id="dexterity_i"/>
        </li>
        <li id="constitution">
            <span>CON</span>
            <span id="constitution_m"></span>
            <input id="constitution_i"/>
        </li>
        <li id="intelligence">
            <span>INT</span>
            <span id="intelligence_m"></span>
            <input id="intelligence_i"/>
        </li>
        <li id="wisdom">
            <span>WIS</span>
            <span id="wisdom_m"></span>
            <input id="wisdom_i"/>
        </li>
        <li id="charisma">
            <span>CHA</span>
            <span id="charisma_m"></span>
            <input id="charisma_i"/>
        </li>
    </ul>
</section>

<section id="skills-container">
    <h2>Skills</h2>
    <ul class="no-style-list" id="skills-list"></ul>
    <script type="module">
        import { fillSkillsList } from "{{ '/assets/js/player-character/skills.js' | relative_url }}";
        fillSkillsList({{ site.data.skills | jsonify }});
    </script>
</section>

<script type="module">
    import { initPage } from "{{ '/assets/js/player-character/player-character.js' | relative_url }}";
    initPage();
</script>