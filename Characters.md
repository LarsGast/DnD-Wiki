---
layout: page
title: Karakters
permalink: /characters/
---

In deze sectie van de wiki vind je alle karakters die voorkomen in de campaigns die ik als DM gegeven heb. De individuele pagina van elk karakter bevat verschillende stukken informatie over het karakter. Hieronder staat een lijst met alle karakters op alfabetische volgorde. Klik op de naam van een karakter om de pagina van dat karakter te bekijken. Informatie dat (nog) niet bekend is over het karakter zal niet beschreven staan op de pagina van het karakter, tenzij het weinig tot niet met het verhaallijn te maken heeft.

<ul class="no-style-list no-style-link-group character-list">
    {% for character in site.data.characters %}
        {% if character.visible %}
        <li>
            <a href="../characters/{% if character.customLink %}{{ character.customLink }}{% else %}{{ character.name | replace: ' ', '-' }}{% endif %}">
                <div class="character-summary-wrapper">
                    <h2>{{ character.name }}</h2>
                    <div class="character-icons">
                        {% for icon_name in character.icons %}
                            {% assign icon = site.data.icons | where:"name", icon_name.name | first %}
                            {% if icon %}
                                <span class="icon {{ icon.name }}" title="{{ icon.description }}"></span>
                            {% endif %}
                        {% endfor %}
                    </div>
                </div>
            </a>  
        </li>
        {% endif %}
    {% endfor %}
</ul>