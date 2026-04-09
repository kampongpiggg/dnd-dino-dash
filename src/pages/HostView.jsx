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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--chult-jungle-dark)' }}>
        <div className="text-3xl" style={{ color: 'var(--chult-gold)' }}>Loading race data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--chult-jungle-dark)' }}>
        <div className="text-2xl text-center p-8" style={{ color: 'var(--chult-terracotta)' }}>
          <p>Failed to connect to Firebase</p>
          <p className="text-lg mt-4" style={{ color: 'var(--chult-sand)' }}>Make sure your .env file is configured correctly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 flex flex-col" style={{ backgroundColor: 'var(--chult-jungle-dark)' }}>
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--chult-gold)' }}>
          DINO-DASH LIVE TRACKER
        </h1>
        <p className="text-lg" style={{ color: 'var(--chult-sand)' }}>Port Nyanzaru Dinosaur Race</p>
      </header>

      <main className="flex-1">
        <RaceChart dinosaurs={dinosaurs} />
      </main>

      <WinnerConfetti winner={winner} />
    </div>
  );
};
