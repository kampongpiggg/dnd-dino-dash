export const DINOSAURS = [
  { id: 'dino_1', name: 'Thunderbolt', color: '#FF0000' },
  { id: 'dino_2', name: 'Princess', color: '#FF00FF' },
  { id: 'dino_3', name: "Ubtao's Favorite", color: '#00FFFF' },
  { id: 'dino_4', name: 'Zongo', color: '#FFFF00' },
  { id: 'dino_5', name: 'Big Honker', color: '#FF8800' },
  { id: 'dino_6', name: 'Banana Candy', color: '#ADFF2F' },
  { id: 'dino_7', name: 'Scarback', color: '#7F00FF' },
  { id: 'dino_8', name: 'Mountain Thunder', color: '#00FF00' },
];

export const INITIAL_DINOSAUR_STATE = DINOSAURS.map(dino => ({
  ...dino,
  rider: '',
  tally: 0,
  status: 'Active',
}));

export const FINISH_LINE = 400;
export const TRACK_MAX = 450;
