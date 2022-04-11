import { ActionOutcome } from "./action_outcome";



export class ActionResult {
    #actionOutcome: ActionOutcome;

    constructor(actionOutcome: ActionOutcome) {
        this.#actionOutcome = actionOutcome;
    }

    getActionOutcome() : ActionOutcome {
        return this.#actionOutcome;
    }

    amendActionOutcome(newActionOutcome: ActionOutcome) : void {
        this.#actionOutcome = newActionOutcome;
    }
}
