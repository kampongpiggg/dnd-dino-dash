import { useEffect, useRef } from 'react';
import { useDinosaurs } from '../hooks/useDinosaurs';
import { useWinner } from '../hooks/useWinner';
import { useGlobalState } from '../hooks/useGlobalState';
import { useInitiativeOrder } from '../hooks/useInitiativeOrder';
import { useLeadChangeDetector } from '../hooks/useLeadChangeDetector';
import { RaceChart } from '../components/host/RaceChart';
import { WinnerBanner } from '../components/host/WinnerBanner';
import { InitiativeSidebar } from '../components/host/InitiativeSidebar';
import { MarqueeTicker } from '../components/host/MarqueeTicker';
import { StageHeader } from '../components/shared/StageHeader';
import { InjectCard } from '../components/shared/InjectCard';
import { getStageInject, hasInject } from '../config/injectContent';
import { checkAndSeedIfEmpty } from '../services/dinosaurService';
import { checkAndInitializeGlobalState, hideInjectCard, showInjectCard } from '../services/globalStateService';

export const HostView = () => {
  const { dinosaurs, loading, error } = useDinosaurs(true);
  const winner = useWinner(dinosaurs);
  const { currentStageName, currentStage, isPaused, currentTurnIndex, tickerMessage, tickerTimestamp, tickerSpeed, showInject } = useGlobalState();
  const currentInject = getStageInject(currentStage);
  const prevStageRef = useRef(currentStage);

  // Auto-show inject card when stage changes
  useEffect(() => {
    if (currentStage !== prevStageRef.current) {
      prevStageRef.current = currentStage;
      if (hasInject(currentStage)) {
        showInjectCard();
      }
    }
  }, [currentStage]);
  const { initiativeOrder, getDinoAtTurnIndex } = useInitiativeOrder(dinosaurs);

  const currentTurnDino = getDinoAtTurnIndex(currentTurnIndex);

  // Auto-detect and broadcast lead changes
  useLeadChangeDetector(dinosaurs, true);

  useEffect(() => {
    checkAndSeedIfEmpty();
    checkAndInitializeGlobalState();
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
    <div className="min-h-screen p-4 pb-16 flex flex-col" style={{ backgroundColor: 'var(--chult-jungle-dark)' }}>
      <header className="text-center mb-4">
        <h1 className="text-4xl font-bold" style={{ color: 'var(--chult-gold)' }}>
          DINO-DASH LIVE TRACKER
        </h1>
        <div className="mt-2">
          <StageHeader
            stageName={currentStageName}
            stageNumber={currentStage}
            isPaused={isPaused}
          />
        </div>
      </header>

      <main className="flex-1 flex gap-4">
        <div className="flex-1">
          <RaceChart dinosaurs={dinosaurs} currentTurnDinoId={currentTurnDino?.id} />
        </div>
        <div className="w-64 flex-shrink-0">
          <InitiativeSidebar
            initiativeOrder={initiativeOrder}
            currentTurnIndex={currentTurnIndex}
          />
        </div>
      </main>

      <WinnerBanner winner={winner} />
      <MarqueeTicker adminMessage={tickerMessage} adminTimestamp={tickerTimestamp} tickerSpeed={tickerSpeed} />

      {/* Stage Event Card */}
      {showInject && currentInject && (
        <InjectCard
          cardType={currentInject.cardType}
          title={currentInject.title}
          challenge={currentInject.challenge}
          successText={currentInject.successText}
          description={currentInject.description}
          onDismiss={hideInjectCard}
        />
      )}
    </div>
  );
};
