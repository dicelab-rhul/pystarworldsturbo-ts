import { Message } from "./message";



export class BccMessage extends Message {
    constructor(content: String, senderID: String, recipientID: String) {
        super(content, senderID, [recipientID]);
    }

    toString() : String {
        return "Message: (from: " + this.getSenderID() + ", content: " + this.getContent() + ")";
    }
}
