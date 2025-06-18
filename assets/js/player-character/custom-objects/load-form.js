import { ApiCategory } from "../api.js";
import { globals } from "../load-page.js";
import { CustomRaceForm } from "./objects/custom-elements/RaceFormElements.js";

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const customObjectBankEntry = globals.customObjectBank.getCustomObjectBankEntryByIndex(id);

const pageContent = document.getElementsByClassName("post-content")[0];

if (customObjectBankEntry.apiCategoryName === ApiCategory.Races.name) {
    pageContent.appendChild(new CustomRaceForm(customObjectBankEntry.customObject));
}
