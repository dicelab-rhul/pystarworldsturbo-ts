export abstract class Identifiable {
    #id: String;

    constructor(identifiableID: String) {
        if (identifiableID == null) {
            this.#id = this.#generateNewID();
        }
        else {
            this.#id = identifiableID;
        }
    }

    getID() : String {
        return this.#id;
    }

    #generateNewID() : String {
        const { v4: uuidv4 } = require("uuid");

        return uuidv4();
    }
}
