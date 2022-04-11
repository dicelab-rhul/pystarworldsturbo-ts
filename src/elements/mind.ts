import { Action } from "../common/action";



export abstract class Mind {

    // To be overridden by subclasses.
    abstract perceive(..._: any[]) : void;

    // To be overridden by subclasses.
    abstract revise(..._: any[]) : void;

    // To be overridden by subclasses.
    abstract decide(..._: any[]) : void;

    // To be overridden by subclasses.
    abstract execute(..._: any[]) : Action;
}
