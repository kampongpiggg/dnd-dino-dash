// Port Nyanzaru Dinosaur Racing Colors - Chult themed palette
export const DINOSAURS = [
  { id: 'dino_1', name: 'Thunderbolt', color: '#E6C84A', checkDC: 16, speed: '50/80', conMod: +2 },
  { id: 'dino_2', name: 'Princess', color: '#C77DB5', checkDC: 12, speed: '40/60', conMod: +2 },
  { id: 'dino_3', name: "Ubtao's Favorite", color: '#4ABFBF', checkDC: 14, speed: '50/75', conMod: +2 },
  { id: 'dino_4', name: 'Zongo', color: '#D4942A', checkDC: 14, speed: '40/60', conMod: +2 },
  { id: 'dino_5', name: 'Big Honker', color: '#D96B4D', checkDC: 18, speed: '50/100', conMod: +3 },
  { id: 'dino_6', name: 'Banana Candy', color: '#8DB84A', checkDC: 11, speed: '40/50', conMod: +1 },
  { id: 'dino_7', name: 'Scarback', color: '#A64D4D', checkDC: 18, speed: '50/100', conMod: +1 },
  { id: 'dino_8', name: 'Mountain Thunder', color: '#5A9A6B', checkDC: 8, speed: '30/50', conMod: +2 },
];

export const INITIAL_DINOSAUR_STATE = DINOSAURS.map(dino => ({
  ...dino,
  rider: '',
  tally: 0,
  status: 'Active',
  initiative: null,
}));

export const FINISH_LINE = 400;
export const TRACK_MAX = 450;
