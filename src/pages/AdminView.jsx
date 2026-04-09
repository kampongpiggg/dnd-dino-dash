import { useEffect } from 'react';
import { useDinosaurs } from '../hooks/useDinosaurs';
import { useGlobalState } from '../hooks/useGlobalState';
import { useInitiativeOrder } from '../hooks/useInitiativeOrder';
import { ResetButton } from '../components/admin/ResetButton';
import { StageControls } from '../components/admin/StageControls';
import { InitiativeControls } from '../components/admin/InitiativeControls';
import { InjectControls } from '../components/admin/InjectControls';
import { BroadcastDesk } from '../components/admin/BroadcastDesk';
import { seedDinosaurs } from '../services/dinosaurService';
import { checkAndInitializeGlobalState } from '../services/globalStateService';

export const AdminView = () => {
  const { dinosaurs, loading } = useDinosaurs(false);
  const { currentStage, isPaused, raceStarted, currentTurnIndex, tickerMessage, tickerSpeed, showInject, loading: globalLoading } = useGlobalState();
  const { initiativeOrder, getDinoAtTurnIndex } = useInitiativeOrder(dinosaurs);

  const currentTurnDino = getDinoAtTurnIndex(currentTurnIndex);

  useEffect(() => {
    checkAndInitializeGlobalState();
  }, []);

  const handleSeed = async () => {
    if (confirm('This will overwrite all dinosaur data. Continue?')) {
      await seedDinosaurs();
      alert('Database seeded!');
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: 'var(--chult-jungle-dark)' }}>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: 'var(--chult-gold)' }}>ADMIN PANEL</h1>
        <p style={{ color: 'var(--chult-sand)' }}>Race Control</p>
      </header>

      <div className="max-w-md mx-auto space-y-8">
        {!globalLoading && (
          <StageControls
            currentStage={currentStage}
            isPaused={isPaused}
            raceStarted={raceStarted}
          />
        )}

        {!loading && dinosaurs.length > 0 && (
          <div className="pt-4" style={{ borderTop: '1px solid var(--chult-stone)' }}>
            <InitiativeControls
              dinosaurs={dinosaurs}
              initiativeOrder={initiativeOrder}
              currentTurnIndex={currentTurnIndex}
              currentTurnDino={currentTurnDino}
            />
          </div>
        )}

        {!globalLoading && (
          <div className="pt-4" style={{ borderTop: '1px solid var(--chult-stone)' }}>
            <InjectControls currentStage={currentStage} showInject={showInject} />
          </div>
        )}

        <div className="pt-4" style={{ borderTop: '1px solid var(--chult-stone)' }}>
          <BroadcastDesk currentMessage={tickerMessage} tickerSpeed={tickerSpeed} />
        </div>

        <div className="pt-4" style={{ borderTop: '1px solid var(--chult-stone)' }}>
          <ResetButton />
        </div>

        <div className="pt-8" style={{ borderTop: '1px solid var(--chult-stone)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--chult-cream)' }}>Database Tools</h2>
          <button
            onClick={handleSeed}
            className="w-full h-14 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110"
            style={{ backgroundColor: 'var(--chult-terracotta)' }}
          >
            Seed/Reset Database
          </button>
          <p className="text-sm mt-2 text-center" style={{ color: 'var(--chult-stone)' }}>
            Use this if the database is empty or corrupted
          </p>
        </div>

        {!loading && dinosaurs.length > 0 && (
          <div className="pt-8" style={{ borderTop: '1px solid var(--chult-stone)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--chult-cream)' }}>Current State</h2>
            <div className="space-y-2">
              {dinosaurs.map((dino) => (
                <div
                  key={dino.id}
                  className="flex justify-between items-center p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--chult-jungle)' }}
                >
                  <span className="font-bold" style={{ color: dino.color }}>
                    {dino.name}
                  </span>
                  <span style={{ color: 'var(--chult-cream)' }}>
                    {dino.tally}ft · {dino.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
