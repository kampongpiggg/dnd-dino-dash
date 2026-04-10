import { useState, useEffect, useCallback } from 'react';
import { useDinosaurs } from '../hooks/useDinosaurs';
import { useGlobalState } from '../hooks/useGlobalState';
import { useInitiativeOrder } from '../hooks/useInitiativeOrder';
import { DinoSelector } from '../components/player/DinoSelector';
import { DistanceInput } from '../components/player/DistanceInput';
import { RiderInput } from '../components/player/RiderInput';
import { TurnAlert } from '../components/player/TurnAlert';
import { StageHeader } from '../components/shared/StageHeader';
import { DINOSAURS } from '../config/dinosaurs';
import { updateTally, updateRider, checkAndSeedIfEmpty } from '../services/dinosaurService';
import { checkAndInitializeGlobalState } from '../services/globalStateService';

export const PlayerView = () => {
  const { dinosaurs, loading, error } = useDinosaurs(false);
  const { currentStageName, currentStage, isPaused, currentTurnIndex } = useGlobalState();
  const { getDinoAtTurnIndex } = useInitiativeOrder(dinosaurs);
  const [selectedId, setSelectedId] = useState(null);
  const [lastAdded, setLastAdded] = useState(0);

  const currentTurnDino = getDinoAtTurnIndex(currentTurnIndex);

  useEffect(() => {
    checkAndSeedIfEmpty();
    checkAndInitializeGlobalState();
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
        <div className="mt-2 mb-2">
          <StageHeader
            stageName={currentStageName}
            stageNumber={currentStage}
            isPaused={isPaused}
          />
        </div>
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
            {/* Show rider input first if no rider name entered yet */}
            {!selectedDino.rider && (
              <RiderInput
                value={selectedDino.rider}
                onChange={handleRiderChange}
                disabled={false}
              />
            )}

            {/* Only show the rest once rider name is entered */}
            {selectedDino.rider && (
              <>
                {/* Cheatsheet - shows dino stats */}
                {(() => {
                  const dinoConfig = DINOSAURS.find(d => d.id === selectedDino.id);
                  return dinoConfig && (
                    <div
                      className="p-3 rounded-lg border-2"
                      style={{
                        backgroundColor: 'var(--chult-jungle)',
                        borderColor: selectedDino.color,
                      }}
                    >
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-sm" style={{ color: 'var(--chult-sand)' }}>Check DC</div>
                          <div className="text-2xl font-bold" style={{ color: 'var(--chult-gold)' }}>{dinoConfig.checkDC}</div>
                        </div>
                        <div>
                          <div className="text-sm" style={{ color: 'var(--chult-sand)' }}>Speed</div>
                          <div className="text-2xl font-bold" style={{ color: 'var(--chult-gold)' }}>{dinoConfig.speed}</div>
                        </div>
                        <div>
                          <div className="text-sm" style={{ color: 'var(--chult-sand)' }}>Con Mod</div>
                          <div className="text-2xl font-bold" style={{ color: 'var(--chult-gold)' }}>
                            {dinoConfig.conMod >= 0 ? `+${dinoConfig.conMod}` : dinoConfig.conMod}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

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
              </>
            )}
          </>
        )}
      </div>

      {selectedDino && selectedDino.rider && (
        <TurnAlert
          isYourTurn={currentTurnDino?.id === selectedId}
          dinoName={selectedDino.name}
          dinoColor={selectedDino.color}
        />
      )}
    </div>
  );
};
