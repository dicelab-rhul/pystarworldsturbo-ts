import { ActionExecutor } from "./action_executor";
import { Action } from "../../common/action";



export abstract class ExecutorFactory {

    // To be overridden by subclasses.
    abstract getExecutorFor(action: Action) : ActionExecutor;
}
