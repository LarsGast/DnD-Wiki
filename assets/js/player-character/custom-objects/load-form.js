import { ApiCategory } from "../api.js";
import { globals } from "../load-globals.js";
import { RaceForm } from "./objects/custom-elements/specific-forms/RaceForm.js";

const pageContent = document.getElementsByClassName("post-content")[0];

if (globals.activeCustomObjectEntry.apiCategoryName === ApiCategory.Races.name) {
    pageContent.appendChild(new RaceForm(globals.activeCustomObjectEntry.customObject));
}
