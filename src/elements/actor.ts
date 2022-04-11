import { Mind } from "./mind";
import { Body } from "./body";
import { Sensor } from "./sensor";
import { Actuator } from "./actuator";
import { BccMessage } from "../common/bcc_message";
import { Action } from "../common/action";



export class Actor extends Body {
    #mind: Mind;
    #sensors: Array<Sensor>;
    #actuators: Array<Actuator>;

    constructor(mind: Mind, sensors: Array<Sensor>, actuators: Array<Actuator>) {
        super();

        this.#mind = mind;
        this.#sensors = sensors;
        this.#actuators = actuators;
    }

    getMind() : Mind {
        return this.#mind;
    }

    getSensors() : Array<Sensor> {
        return this.#sensors;
    }

    getListeningSensor() : Sensor {
        return this.getSensorFor(BccMessage);
    }

    getSensorFor(eventType: any) : Sensor {
        for (const sensor of this.#sensors) {
            if (sensor.isSubscribedTo(eventType.name)) {
                return sensor;
            }
        }

        return null;
    }

    getActuators() : Array<Actuator> {
        return this.#actuators;
    }

    getActuatorFor(eventType: any) : Actuator {
        for (const actuator of this.#actuators) {
            if (actuator.isSubscribedTo(eventType.name)) {
                return actuator;
            }
        }

        return null;
    }

    cycle() : void {}

    getPendingActions() : Array<Action> {
        let actions: Array<Action> = [];

        for (const actuator of this.#actuators) {
            while (actuator.hasPendingActions()) {
                actions.push(actuator.source());
            }
        }

        return actions;
    }
}