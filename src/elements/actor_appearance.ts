import { Identifiable } from "../common/identifiable";



export abstract class ActorAppearance extends Identifiable {
    constructor(actorID: String) {
        super(actorID);
    }
}
