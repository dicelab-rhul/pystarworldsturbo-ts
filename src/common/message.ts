import { Perception } from "./perception";



export class Message extends Perception {
    #content: String;
    #senderID: String;
    #recipientsIDs: Array<String>;

    constructor(content: String, senderID: String, recipientsIDs: Array<String>) {
        super();

        this.#content = content;
        this.#senderID = senderID;
        this.#recipientsIDs = recipientsIDs == null ? [] : recipientsIDs;
    }

    getContent() : String {
        return this.#content;
    }

    getSenderID(): String {
        return this.#senderID;
    }

    getRecipientsIDs() : Array<String> {
        return this.#recipientsIDs;
    }

    overrideRecipients(newRecipientsIDs: Array<String>) : void {
        this.#recipientsIDs = newRecipientsIDs == null ? [] : newRecipientsIDs;
    }
}
