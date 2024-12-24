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
    <ul class="no-style-list">
        <li>
            <span>STR</span>
            <span>0</span>
            <input/>
        </li>
        <li>
            <span>DEX</span>
            <span>0</span>
            <input/>
        </li>
        <li>
            <span>CON</span>
            <span>0</span>
            <input/>
        </li>
        <li>
            <span>INT</span>
            <span>0</span>
            <input/>
        </li>
        <li>
            <span>WIS</span>
            <span>0</span>
            <input/>
        </li>
        <li>
            <span>CHA</span>
            <span>0</span>
            <input/>
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