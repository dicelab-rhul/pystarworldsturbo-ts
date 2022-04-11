import { Event } from "./event";



export class Action extends Event {
    #actorID: String;

    constructor(actorID: String) {
        super();

        this.#actorID = actorID;
    }

    getActorID() : String {
        return this.#actorID;
    }

    setActorID(actorID: String) : void {
        this.#actorID = actorID;
    }
}
