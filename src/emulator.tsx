import type {
  IEmulatorScenario,
  IEmulatorCue,
  TScenarioOnStart,
} from '@crestron/ch5-crcomlib';

const cues: IEmulatorCue[] = [
  {
    type: 'boolean',
    event: '1',
    trigger: true,
    actions: [
      { state: '1', type: 'boolean', logic: 'set', value: true },
      { state: '5', type: 'boolean', logic: 'set', value: false },
      { state: '6', type: 'boolean', logic: 'set', value: false },
      { state: '7', type: 'boolean', logic: 'set', value: false },
      { state: '20', type: 'boolean', logic: 'set', value: false },
    ],
  },
  {
    type: 'boolean',
    event: '5',
    trigger: true,
    actions: [
      { state: '1', type: 'boolean', logic: 'set', value: false },
      { state: '5', type: 'boolean', logic: 'set', value: true },
      { state: '6', type: 'boolean', logic: 'set', value: false },
      { state: '7', type: 'boolean', logic: 'set', value: false },
      { state: '20', type: 'boolean', logic: 'set', value: false },
    ],
  },
  {
    type: 'boolean',
    event: '6',
    trigger: true,
    actions: [
      { state: '1', type: 'boolean', logic: 'set', value: false },
      { state: '5', type: 'boolean', logic: 'set', value: false },
      { state: '6', type: 'boolean', logic: 'set', value: true },
      { state: '7', type: 'boolean', logic: 'set', value: false },
      { state: '20', type: 'boolean', logic: 'set', value: false },
    ],
  },
  {
    type: 'boolean',
    event: '7',
    trigger: true,
    actions: [
      { state: '1', type: 'boolean', logic: 'set', value: false },
      { state: '5', type: 'boolean', logic: 'set', value: false },
      { state: '6', type: 'boolean', logic: 'set', value: false },
      { state: '7', type: 'boolean', logic: 'set', value: true },
      { state: '20', type: 'boolean', logic: 'set', value: false },
    ],
  },
  {
    type: 'boolean',
    event: '20',
    trigger: true,
    actions: [
      { state: '1', type: 'boolean', logic: 'set', value: false },
      { state: '5', type: 'boolean', logic: 'set', value: false },
      { state: '6', type: 'boolean', logic: 'set', value: false },
      { state: '7', type: 'boolean', logic: 'set', value: false },
      { state: '20', type: 'boolean', logic: 'set', value: true },
    ],
  },
  {
    type: 'boolean',
    event: '33',
    trigger: true,
    actions: [
      { state: '33', type: 'boolean', logic: 'set', value: true },
      { state: '34', type: 'boolean', logic: 'set', value: false },
      { state: '15', type: 'number', logic: 'set', value: 1 },
    ],
  },
  {
    type: 'boolean',
    event: '34',
    trigger: true,
    actions: [
      { state: '33', type: 'boolean', logic: 'set', value: false },
      { state: '34', type: 'boolean', logic: 'set', value: true },
      { state: '15', type: 'number', logic: 'set', value: 0 },
    ],
  },
];

const onStart: TScenarioOnStart[] = [
  { state: '33', type: 'boolean', value: false },
  { state: '34', type: 'boolean', value: true },
  { state: '71', type: 'boolean', value: true },
  { state: '72', type: 'boolean', value: true },
  { state: '15', type: 'number', value: 0 },
];

const scenario: IEmulatorScenario = { cues, onStart };

export default scenario;
