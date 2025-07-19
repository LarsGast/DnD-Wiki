import { ApiCategory } from "../api.js";
import { globals } from "../load-globals.js";
import { RaceForm } from "./objects/custom-elements/specific-forms/RaceForm.js";

const pageContent = document.getElementsByClassName("post-content")[0];

if (globals.activeHomebrewEntry.apiCategoryName === ApiCategory.Races.name) {
    pageContent.appendChild(new RaceForm(globals.activeHomebrewEntry.homebrewObject));
}
