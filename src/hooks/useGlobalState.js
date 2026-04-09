import { useState, useEffect, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/firebase';
import { getStageName } from '../config/stages';

export const useGlobalState = () => {
  const [globalState, setGlobalState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stateRef = ref(database, 'global_state');

    const unsubscribe = onValue(
      stateRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setGlobalState(snapshot.val());
        } else {
          setGlobalState(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const currentStageName = useMemo(() => {
    if (!globalState) return '';
    return getStageName(globalState.currentStage);
  }, [globalState]);

  return {
    globalState,
    currentStageName,
    currentStage: globalState?.currentStage ?? 0,
    isPaused: globalState?.isPaused ?? false,
    raceStarted: globalState?.raceStarted ?? false,
    currentTurnIndex: globalState?.currentTurnIndex ?? 0,
    tickerMessage: globalState?.tickerMessage ?? '',
    tickerTimestamp: globalState?.tickerTimestamp ?? 0,
    loading,
    error,
  };
};
