import { useMemo } from 'react';

export const useInitiativeOrder = (dinosaurs) => {
  const initiativeOrder = useMemo(() => {
    if (!dinosaurs || dinosaurs.length === 0) return [];

    // Filter dinosaurs with initiative set, sort by initiative descending
    return [...dinosaurs]
      .filter((dino) => dino.initiative !== null && dino.initiative !== undefined)
      .sort((a, b) => {
        // Sort by initiative descending (highest first)
        if (b.initiative !== a.initiative) {
          return b.initiative - a.initiative;
        }
        // Tie-breaker: use id for consistent ordering
        return a.id.localeCompare(b.id);
      });
  }, [dinosaurs]);

  const allDinosHaveInitiative = useMemo(() => {
    if (!dinosaurs || dinosaurs.length === 0) return false;
    return dinosaurs.every(
      (dino) => dino.initiative !== null && dino.initiative !== undefined
    );
  }, [dinosaurs]);

  const getDinoAtTurnIndex = (turnIndex) => {
    if (initiativeOrder.length === 0) return null;
    const safeIndex = turnIndex % initiativeOrder.length;
    return initiativeOrder[safeIndex] || null;
  };

  return {
    initiativeOrder,
    allDinosHaveInitiative,
    getDinoAtTurnIndex,
    initiativeCount: initiativeOrder.length,
  };
};
