export type FsmDefinition = Record<string, Record<string, string>>;
export type FsmNodes<T extends FsmDefinition> = keyof T extends string ? keyof T : never;
export type FsmActions<T extends FsmDefinition> = { [K in keyof T]: keyof T[K] }[keyof T];
export type Listener = () => void;

function addListener(listeners: Listener[], listener: Listener) {
    listeners.push(listener);

    return () => {
        const index = listeners.indexOf(listener);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    };
}

export class FSM<T extends Record<string, Record<string, string>>> {
    definition: T;
    currentState: FsmNodes<T>;

    onEnterListeners: Record<string, Listener[]> = {} as Record<string, Listener[]>;
    onLeaveListeners: Record<string, Listener[]> = {} as Record<string, Listener[]>;

    constructor(fsmDefinition: T, initialState: FsmNodes<T>) {
        this.definition = fsmDefinition;
        this.currentState = initialState;
    }

    transition(action: FsmActions<T>) {
        const nextState = this.definition[this.currentState][action] as unknown as FsmNodes<T>;
        if (nextState) {
            this.onLeaveListeners[this.currentState]?.forEach(listener => listener());
            this.currentState = nextState;
            this.onEnterListeners[this.currentState]?.forEach(listener => listener());
        } else {
            throw new Error(`Invalid action "${String(action)}" for state "${this.currentState}"`);
        }
    }

    onEnter(state: FsmNodes<T>, listener: Listener) {
        this.onLeaveListeners[state] ||= [];

        return addListener(this.onEnterListeners[state], listener);
    }

    onLeave(state: FsmNodes<T>, listener: Listener) {
        this.onLeaveListeners[state] ||= [];

        return addListener(this.onLeaveListeners[state], listener);
    }

    destroy() {
        this.onEnterListeners = {};
        this.onLeaveListeners = {};
    }
}
