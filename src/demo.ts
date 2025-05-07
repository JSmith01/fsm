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

fsm.onEnter('node1', console.log);
fsm.transition('action2');
fsm.onLeave('node1', () => console.log('Leaving node1'));
fsm.destroy();
