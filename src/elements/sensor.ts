import { Perception } from "../common/perception";



export abstract class Sensor {
    #subscribedEventTypes: Array<String>;
    #perceptionBuffer: Array<Perception>;

    constructor(subscribedEventTypes: Array<String>) {
        this.#subscribedEventTypes = subscribedEventTypes;
        this.#perceptionBuffer = [];
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

    sink(perception: Perception) : void {
        if (this.isSubscribedTo((typeof perception).constructor.name)) {
            this.#perceptionBuffer.push(perception);
        }
    }

    hasPerception() : boolean {
        return this.#perceptionBuffer.length != 0;
    }

    source() : Perception {
        if (this.hasPerception()) {
            return this.#perceptionBuffer.shift();
        }
        else {
            return null;
        }
    }
}
