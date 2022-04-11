import { Ambient } from "./ambient";
import { Actor } from "../elements/actor";
import { Body } from "../elements/body";
import { Perception } from "../common/perception";
import { ActionResult } from "../common/action_result";
import { Message } from "../common/message";
import { BccMessage } from "../common/bcc_message";
import { Sensor } from "../elements/sensor";
import { Action } from "../common/action";
import { ActionExecutor } from "./physics/action_executor";



export abstract class Environment {
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

    abstract generatePerceptionForActor(actorID: String, actionResult: ActionResult) : Perception;

    sendMessageToActors(message: Message) : void {
        if (message.getRecipientsIDs().length == 0) {
            message.overrideRecipients(Array.from(this.#actors.keys()));
        }

        for (const recipientID of message.getRecipientsIDs()) {
            if (this.#actors.has(recipientID)) {
                let bccMessage: BccMessage = new BccMessage(message.getContent(), message.getSenderID(), recipientID);
                let recipientListeningSensor: Sensor = this.#actors.get(recipientID).getListeningSensor()

                if (recipientListeningSensor != null) {
                    recipientListeningSensor.sink(bccMessage);
                }
            }
        }
    }

    sendPerceptionToActor(perception: Perception, actorID: String) : void {
        if (this.#actors.has(actorID)) {
            let actorSensor: Sensor = this.#actors.get(actorID).getSensorFor(perception.constructor.name);

            if (actorSensor != null) {
                actorSensor.sink(perception);
            }
        }
    }

    executeCycleActions() : void {
        for (const actor of this.#actors.values()) {
            actor.cycle();

            let actions: Array<Action> = actor.getPendingActions();

            this.validateActions(actions);

            for (const action of actions) {
                this.#executeAction(action);
            }
        }
    }

    abstract validateActions(actions: Array<Action>) : void;

    #executeAction(action: Action) : void {
        let actionExecutor: ActionExecutor = this.getExecutorFor(action);

        if (actionExecutor != null) {
            let result: ActionResult = actionExecutor.attempt(this, action);
            let perception: Perception = this.generatePerceptionForActor(action.getActorID(), result);

            this.sendPerceptionToActor(perception, action.getActorID());
        }
        else {
            throw new Error("No suitable action executor found for " + action.constructor.name + "!")
        }
    }

    abstract getExecutorFor(action: Action) : ActionExecutor;
}
