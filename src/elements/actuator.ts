import { Action } from "../common/action";



export abstract class Actuator {
    #subscribedEventTypes: Array<String>;
    #actionBuffer: Array<Action>;

    constructor(subscribedEventTypes: Array<String>) {
        this.#subscribedEventTypes = subscribedEventTypes;
        this.#actionBuffer = [];
    }

    subscribeToEventType(eventType: String) : void {
        if (!this.#subscribedEventTypes.includes(eventType)) {
            this.#subscribedEventTypes.push(eventType);
        }
    }

    unSubscribeFromEventType(eventType: String) : void {
        if (this.#subscribedEventTypes.includes(eventType)) {
            let index: number = this.#subscribedEventTypes.indexOf(eventType);

            this.#subscribedEventTypes.splice(index, 1);
        }
    }

    isSubscribedTo(eventType: String) : boolean {
        return this.#subscribedEventTypes.includes(eventType);
    }

    sink(perception: Action) : void {
        if (this.isSubscribedTo((typeof perception).constructor.name)) {
            this.#actionBuffer.push(perception);
        }
    }

    hasPendingActions() : boolean {
        return this.#actionBuffer.length != 0;
    }

    source() : Action {
        if (this.hasPendingActions()) {
            return this.#actionBuffer.shift();
        }
        else {
            return null;
        }
    }
}
