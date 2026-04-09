import { useRef, useEffect, useCallback } from 'react';
import { sendTickerMessage } from '../services/globalStateService';

export const useLeadChangeDetector = (dinosaurs, autoSendTicker = true) => {
  const previousLeaderRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const getLeader = useCallback(() => {
    if (!dinosaurs || dinosaurs.length === 0) return null;
    // Leader is the dinosaur with highest tally (first in sorted array)
    return dinosaurs[0];
  }, [dinosaurs]);

  useEffect(() => {
    const currentLeader = getLeader();
    const previousLeader = previousLeaderRef.current;

    // Skip if no leader or same leader
    if (!currentLeader) return;
    if (previousLeader && previousLeader.id === currentLeader.id) return;

    // Skip initial load (no previous leader)
    if (!previousLeader) {
      previousLeaderRef.current = currentLeader;
      return;
    }

    // Lead has changed - debounce to prevent rapid-fire
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (autoSendTicker) {
        sendTickerMessage(`LEAD CHANGE! ${currentLeader.name} takes the lead!`);
      }
      previousLeaderRef.current = currentLeader;
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [dinosaurs, getLeader, autoSendTicker]);

  return {
    currentLeader: getLeader(),
    previousLeader: previousLeaderRef.current,
  };
};
