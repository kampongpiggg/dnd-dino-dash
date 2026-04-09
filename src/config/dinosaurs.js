// Port Nyanzaru Dinosaur Racing Colors - Chult themed palette
export const DINOSAURS = [
  { id: 'dino_1', name: 'Thunderbolt', color: '#E6C84A' },      // Bright gold (lightning)
  { id: 'dino_2', name: 'Princess', color: '#C77DB5' },         // Orchid purple (jungle flower)
  { id: 'dino_3', name: "Ubtao's Favorite", color: '#4ABFBF' }, // Sacred teal (Ubtao's blessing)
  { id: 'dino_4', name: 'Zongo', color: '#D4942A' },            // Amber (jungle sunset)
  { id: 'dino_5', name: 'Big Honker', color: '#D96B4D' },       // Terracotta (Chultan pottery)
  { id: 'dino_6', name: 'Banana Candy', color: '#8DB84A' },     // Jungle lime (tropical fruit)
  { id: 'dino_7', name: 'Scarback', color: '#A64D4D' },         // Crimson (battle-scarred)
  { id: 'dino_8', name: 'Mountain Thunder', color: '#5A9A6B' }, // Forest green (Chultan jungle)
];

export const INITIAL_DINOSAUR_STATE = DINOSAURS.map(dino => ({
  ...dino,
  rider: '',
  tally: 0,
  status: 'Active',
}));

export const FINISH_LINE = 400;
export const TRACK_MAX = 450;
