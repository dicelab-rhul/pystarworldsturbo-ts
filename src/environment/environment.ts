import { Ambient } from "./ambient";
import { Actor } from "../elements/actor";
import { Body } from "../elements/body";



export class Environment {
    #ambient: Ambient;
    #actors: Map<String, Actor>;
    #passiveBodies: Map<String, Body>;

    constructor(ambient: Ambient, actors: Array<Actor>, passiveBodies: Array<Body>) {
        this.#ambient = ambient;
        this.#actors = new Map();
        this.#passiveBodies = new Map();

        for (const actor of actors) {
            this.#actors.set(actor.getID(), actor);
        }

        for (const passiveBody of passiveBodies) {
            this.#passiveBodies.set(passiveBody.getID(), passiveBody);
        }
    }

    getAmbient() : Ambient {
        return this.#ambient;
    }

    getActors() : Map<String, Actor> {
        return this.#actors;
    }

    getActorsList() : Iterable<Actor> {
        return this.#actors.values();
    }

    getActor(actorID: String) : Actor {
        if (this.#actors.has(actorID)) {
            return this.#actors.get(actorID);
        }
        else {
            return null;
        }
    }

    removeActor(actorID: String) : void {
        if (this.#actors.has(actorID)) {
            this.#actors.delete(actorID);
        }
    }

    getPassiveBodies() : Map<String, Body> {
        return this.#passiveBodies;
    }

    getPassiveBodiesList() : Iterable<Body> {
        return this.#passiveBodies.values();
    }

    getPassiveBody(passiveBodyID: String) : Body {
        if (this.#passiveBodies.has(passiveBodyID)) {
            return this.#passiveBodies.get(passiveBodyID);
        }
        else {
            return null;
        }
    }

    removePassiveBody(passiveBodyID: String) : void {
        if (this.#passiveBodies.has(passiveBodyID)) {
            this.#passiveBodies.delete(passiveBodyID);
        }
    }

    // TODO: add the other methods.
}