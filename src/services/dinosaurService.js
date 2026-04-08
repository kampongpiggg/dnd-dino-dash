import { ref, set, update, get } from 'firebase/database';
import { database } from '../config/firebase';
import { INITIAL_DINOSAUR_STATE } from '../config/dinosaurs';

const dinosaursRef = ref(database, 'dinosaurs');

export const seedDinosaurs = async () => {
  const dinosaursData = {};
  INITIAL_DINOSAUR_STATE.forEach(dino => {
    dinosaursData[dino.id] = dino;
  });
  await set(dinosaursRef, dinosaursData);
};

export const updateTally = async (dinoId, newTally) => {
  const dinoRef = ref(database, `dinosaurs/${dinoId}`);
  await update(dinoRef, { tally: Math.max(0, newTally) });
};

export const updateStatus = async (dinoId, status) => {
  const dinoRef = ref(database, `dinosaurs/${dinoId}`);
  await update(dinoRef, { status });
};

export const updateRider = async (dinoId, rider) => {
  const dinoRef = ref(database, `dinosaurs/${dinoId}`);
  await update(dinoRef, { rider });
};

export const resetAll = async () => {
  const updates = {};
  INITIAL_DINOSAUR_STATE.forEach(dino => {
    updates[`${dino.id}/tally`] = 0;
    updates[`${dino.id}/status`] = 'Active';
  });
  await update(dinosaursRef, updates);
};

export const checkAndSeedIfEmpty = async () => {
  const snapshot = await get(dinosaursRef);
  if (!snapshot.exists()) {
    await seedDinosaurs();
  }
};
