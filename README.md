# FSM (Finite State Machine)

A lightweight, type-safe finite state machine (FSM) library for TypeScript. Define states and transitions, perform state changes, and register listeners for entering or leaving states.

## Features
- Type-safe state and action definitions
- Easy-to-use API for transitions
- Register listeners for entering and leaving states
- Lightweight and dependency-free

## Installation

```
npm install <your-package-name>
```
Or simply copy `src/fsm.ts` into your project.

## Usage Example

```typescript
import { FSM } from './fsm';

const fsmDefinition = {
    'node1': {
        'action1': 'node2',
        'action2': 'node3'
    },
    'node2': {
        'action3': 'node1'
    },
    'node3': {
        'action4': 'node1'
    },
};

const fsm = new FSM(fsmDefinition, 'node1');

fsm.onEnter('node1', () => console.log('Entered node1'));
fsm.transition('action2'); // Moves to node3
fsm.onLeave('node1', () => console.log('Leaving node1'));
fsm.destroy();
```

## API

### `FSM<T>(definition: T, initialState: keyof T)`
Creates a new FSM instance.
- `definition`: An object describing states and transitions.
- `initialState`: The starting state.

### `transition(action: string)`
Performs a transition based on the current state and action.
- Throws an error if the action is invalid for the current state.

### `onEnter(state: string, listener: () => void)`
Registers a listener to be called when entering a state.
- Returns an unsubscribe function.

### `onLeave(state: string, listener: () => void)`
Registers a listener to be called when leaving a state.
- Returns an unsubscribe function.

### `destroy()`
Removes all listeners from the FSM instance.

## License

MIT

