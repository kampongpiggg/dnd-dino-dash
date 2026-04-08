import { useEffect } from 'react';
import { useDinosaurs } from '../hooks/useDinosaurs';
import { useWinner } from '../hooks/useWinner';
import { RaceChart } from '../components/host/RaceChart';
import { WinnerConfetti } from '../components/host/WinnerConfetti';
import { checkAndSeedIfEmpty } from '../services/dinosaurService';

export const HostView = () => {
  const { dinosaurs, loading, error } = useDinosaurs(true);
  const winner = useWinner(dinosaurs);

  useEffect(() => {
    checkAndSeedIfEmpty();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-3xl">Loading race data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-2xl text-center p-8">
          <p>Failed to connect to Firebase</p>
          <p className="text-lg mt-4">Make sure your .env file is configured correctly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex flex-col">
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold text-white">
          DINO-DASH LIVE TRACKER
        </h1>
        <p className="text-gray-400 text-lg">Dinosaur Race</p>
      </header>

      <main className="flex-1">
        <RaceChart dinosaurs={dinosaurs} />
      </main>

      <WinnerConfetti winner={winner} />
    </div>
  );
};
