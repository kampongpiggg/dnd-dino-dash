// Port Nyanzaru Dinosaur Race - Stage Manifest
export const STAGES = [
  { id: 0, name: "Wakanga's Villa", description: "Starting Line" },
  { id: 1, name: "Goldenthrone", description: "The Merchant Prince's Palace" },
  { id: 2, name: "Temple of Savras", description: "Temple of the All-Seeing" },
  { id: 3, name: "Temple of Gond", description: "Temple of Craft and Innovation" },
  { id: 4, name: "Jewel Market", description: "The Glittering Bazaar" },
  { id: 5, name: "Executioner's Run", description: "The Deadly Gauntlet" },
  { id: 6, name: "Grand Souk", description: "The Great Marketplace" },
  { id: 7, name: "Grand Coliseum", description: "Finish Line" },
];

export const TOTAL_STAGES = STAGES.length;

export const getStageById = (id) => STAGES.find((stage) => stage.id === id) || STAGES[0];

export const getStageName = (id) => getStageById(id).name;

export const isFirstStage = (id) => id === 0;

export const isLastStage = (id) => id === TOTAL_STAGES - 1;
