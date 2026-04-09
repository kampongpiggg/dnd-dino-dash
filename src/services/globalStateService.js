import { ref, set, update, get, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import { TOTAL_STAGES } from '../config/stages';

const GLOBAL_STATE_REF = 'global_state';

const DEFAULT_STATE = {
  currentStage: 0,
  isPaused: false,
  raceStarted: false,
  currentTurnIndex: 0,
  tickerMessage: '',
  tickerTimestamp: 0,
};

export const initializeGlobalState = async () => {
  const stateRef = ref(database, GLOBAL_STATE_REF);
  await set(stateRef, DEFAULT_STATE);
};

export const checkAndInitializeGlobalState = async () => {
  const stateRef = ref(database, GLOBAL_STATE_REF);
  const snapshot = await get(stateRef);
  if (!snapshot.exists()) {
    await initializeGlobalState();
  }
};

export const getGlobalState = async () => {
  const stateRef = ref(database, GLOBAL_STATE_REF);
  const snapshot = await get(stateRef);
  return snapshot.exists() ? snapshot.val() : null;
};

// Stage Management
export const updateStage = async (stageIndex) => {
  const clampedIndex = Math.max(0, Math.min(stageIndex, TOTAL_STAGES - 1));
  const stateRef = ref(database, GLOBAL_STATE_REF);
  await update(stateRef, { currentStage: clampedIndex });
};

export const nextStage = async () => {
  const state = await getGlobalState();
  if (state && state.currentStage < TOTAL_STAGES - 1) {
    await updateStage(state.currentStage + 1);
  }
};

export const prevStage = async () => {
  const state = await getGlobalState();
  if (state && state.currentStage > 0) {
    await updateStage(state.currentStage - 1);
  }
};

// Race Control
export const togglePause = async () => {
  const state = await getGlobalState();
  if (state) {
    const stateRef = ref(database, GLOBAL_STATE_REF);
    await update(stateRef, { isPaused: !state.isPaused });
  }
};

export const setRaceStarted = async (started) => {
  const stateRef = ref(database, GLOBAL_STATE_REF);
  await update(stateRef, { raceStarted: started });
};

// Turn Management
export const setCurrentTurnIndex = async (index) => {
  const stateRef = ref(database, GLOBAL_STATE_REF);
  await update(stateRef, { currentTurnIndex: index });
};

export const nextTurn = async (maxIndex) => {
  const state = await getGlobalState();
  if (state) {
    const nextIndex = (state.currentTurnIndex + 1) % (maxIndex + 1);
    await setCurrentTurnIndex(nextIndex);
  }
};

export const resetTurn = async () => {
  await setCurrentTurnIndex(0);
};

// Ticker Management
export const sendTickerMessage = async (message) => {
  const stateRef = ref(database, GLOBAL_STATE_REF);
  await update(stateRef, {
    tickerMessage: message,
    tickerTimestamp: Date.now(),
  });
};

export const clearTicker = async () => {
  const stateRef = ref(database, GLOBAL_STATE_REF);
  await update(stateRef, {
    tickerMessage: '',
    tickerTimestamp: 0,
  });
};

// Reset all global state
export const resetGlobalState = async () => {
  await initializeGlobalState();
};
