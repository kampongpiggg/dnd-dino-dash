import { useState, useEffect, useCallback } from 'react';
import { useDinosaurs } from '../hooks/useDinosaurs';
import { DinoSelector } from '../components/player/DinoSelector';
import { DistanceInput } from '../components/player/DistanceInput';
import { StatusToggle } from '../components/player/StatusToggle';
import { RiderInput } from '../components/player/RiderInput';
import { updateTally, updateStatus, updateRider, checkAndSeedIfEmpty } from '../services/dinosaurService';

export const PlayerView = () => {
  const { dinosaurs, loading, error } = useDinosaurs(false);
  const [selectedId, setSelectedId] = useState(null);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => {
    checkAndSeedIfEmpty();
  }, []);

  const selectedDino = dinosaurs.find((d) => d.id === selectedId);

  const handleAddDistance = useCallback(async (value) => {
    if (!selectedDino) return;
    setLastAdded(value);
    await updateTally(selectedDino.id, selectedDino.tally + value);
  }, [selectedDino]);

  const handleUndo = useCallback(async () => {
    if (!selectedDino || lastAdded === 0) return;
    await updateTally(selectedDino.id, selectedDino.tally - lastAdded);
    setLastAdded(0);
  }, [selectedDino, lastAdded]);

  const handleStatusChange = useCallback(async (status) => {
    if (!selectedDino) return;
    await updateStatus(selectedDino.id, status);
  }, [selectedDino]);

  const handleRiderChange = useCallback(async (rider) => {
    if (!selectedDino) return;
    await updateRider(selectedDino.id, rider);
  }, [selectedDino]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--chult-jungle-dark)' }}>
        <div className="text-2xl" style={{ color: 'var(--chult-gold)' }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--chult-jungle-dark)' }}>
        <div className="text-xl text-center" style={{ color: 'var(--chult-terracotta)' }}>
          <p>Connection error</p>
          <p className="text-base mt-2" style={{ color: 'var(--chult-sand)' }}>Check your internet connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--chult-jungle-dark)' }}>
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--chult-gold)' }}>DINO-DASH</h1>
        <p style={{ color: 'var(--chult-sand)' }}>Select your dinosaur</p>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        <DinoSelector
          dinosaurs={dinosaurs}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />

        {selectedDino && (
          <>
            <div
              className="p-4 rounded-lg text-center"
              style={{ backgroundColor: selectedDino.color }}
            >
              <h2 className="text-2xl font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                {selectedDino.name}
              </h2>
            </div>

            <DistanceInput
              currentTally={selectedDino.tally}
              onAdd={handleAddDistance}
              onUndo={handleUndo}
              disabled={false}
            />

            <StatusToggle
              currentStatus={selectedDino.status}
              onChange={handleStatusChange}
              disabled={false}
            />

            <RiderInput
              value={selectedDino.rider}
              onChange={handleRiderChange}
              disabled={false}
            />
          </>
        )}
      </div>
    </div>
  );
};
