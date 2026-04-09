/**
 * useStageTriggers - Placeholder hook for stage-specific event triggers
 *
 * Future implementation will:
 * - Monitor current stage and dinosaur positions
 * - Fire events when trigger conditions are met
 * - Return active events for display
 */

import { useState, useEffect } from 'react';
import { checkStageTriggers } from '../services/stageTriggerService';

export const useStageTriggers = (currentStage, dinosaurs) => {
  const [activeEvent, setActiveEvent] = useState(null);
  const [firedTriggers, setFiredTriggers] = useState([]);

  useEffect(() => {
    // Check for triggered events
    const triggered = checkStageTriggers(currentStage, dinosaurs, {
      firedTriggers,
    });

    if (triggered.length > 0) {
      // Display first triggered event
      setActiveEvent(triggered[0]);
      setFiredTriggers((prev) => [...prev, ...triggered.map((t) => t.id)]);
    }
  }, [currentStage, dinosaurs, firedTriggers]);

  const dismissEvent = () => {
    setActiveEvent(null);
  };

  const resetTriggers = () => {
    setFiredTriggers([]);
    setActiveEvent(null);
  };

  return {
    activeEvent,
    dismissEvent,
    resetTriggers,
  };
};
