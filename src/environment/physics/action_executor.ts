import { ActionResult } from "../../common/action_result"
import { Action } from "../../common/action";
import { ActionOutcome } from "../../common/action_outcome";
import { Environment } from "../environment";



export abstract class ActionExecutor {

    execute(env: Environment, action: Action) : ActionResult {
        if (!this.is_possible(env, action)) {
            return new ActionResult(ActionOutcome.IMPOSSIBLE);
        }
        else {
            let result: ActionResult = this.attempt(env, action);

            if (result.getActionOutcome() == ActionOutcome.SUCCESS && !this.succeeded(env, action)) {
                result.amendActionOutcome(ActionOutcome.FAILURE);
            }

            return result;
        }
    }

    // To be overridden by subclasses.
    abstract is_possible(env: Environment, action: Action) : boolean;

    // To be overridden by subclasses.
    abstract attempt(env: Environment, action: Action) : ActionResult;

    // To be overridden by subclasses.
    abstract succeeded(env: Environment, action: Action) : boolean;
}
