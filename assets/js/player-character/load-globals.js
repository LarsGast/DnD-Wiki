import { PlayerCharacterBank } from "./objects/PlayerCharacterBank.js";
import { CustomObjectBank } from "./objects/CustomObjectBank.js";
import { PlayerCharacter } from "./objects/PlayerCharacter.js";

/**
 * A set of global variables to be used all across the codebase.
 */
export const globals = {

    /**
     * Global singleton of the player character bank.
     * This includes all PCs, both active and inactive.
     * @type {PlayerCharacterBank}
     */
    playerCharacterBank: PlayerCharacterBank.load(),


    /**
     * Global singleton of the player character bank.
     * This includes all PCs, both active and inactive.
     * @type {CustomObjectBank}
     */
    customObjectBank: CustomObjectBank.load(),

    /**
     * The current active PC.
     * Part of the player bank, this variable can have it's properties changed by reference and will be saved if the bank is saved.
     * @type {PlayerCharacter}
     */
    get activePlayerCharacter() {
        return this.playerCharacterBank.getActivePlayerCharacterBankEntry().playerCharacter;
    }
}