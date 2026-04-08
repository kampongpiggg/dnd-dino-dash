import { useMemo } from 'react';
import { FINISH_LINE } from '../config/dinosaurs';

export const useWinner = (dinosaurs) => {
  return useMemo(() => {
    const winner = dinosaurs.find(dino => dino.tally >= FINISH_LINE);
    return winner || null;
  }, [dinosaurs]);
};
