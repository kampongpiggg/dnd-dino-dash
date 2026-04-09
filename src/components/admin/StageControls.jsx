import { STAGES, TOTAL_STAGES, isFirstStage, isLastStage } from '../../config/stages';
import {
  nextStage,
  prevStage,
  updateStage,
  togglePause,
  setRaceStarted,
} from '../../services/globalStateService';

export const StageControls = ({ currentStage, isPaused, raceStarted }) => {
  const handlePrevStage = async () => {
    await prevStage();
  };

  const handleNextStage = async () => {
    await nextStage();
  };

  const handleStageSelect = async (e) => {
    const stageIndex = parseInt(e.target.value, 10);
    await updateStage(stageIndex);
  };

  const handleTogglePause = async () => {
    await togglePause();
  };

  const handleStartRace = async () => {
    await setRaceStarted(true);
  };

  const handleResetRace = async () => {
    await setRaceStarted(false);
    await updateStage(0);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--chult-cream)' }}>
        Stage Management
      </h2>

      {/* Stage Selector */}
      <div className="space-y-2">
        <label className="text-sm" style={{ color: 'var(--chult-sand)' }}>
          Current Stage
        </label>
        <select
          value={currentStage}
          onChange={handleStageSelect}
          className="w-full h-12 px-3 rounded-lg text-lg font-bold border-2"
          style={{
            backgroundColor: 'var(--chult-jungle)',
            borderColor: 'var(--chult-stone)',
            color: 'var(--chult-cream)',
          }}
        >
          {STAGES.map((stage) => (
            <option key={stage.id} value={stage.id}>
              {stage.id + 1}. {stage.name}
            </option>
          ))}
        </select>
      </div>

      {/* Prev/Next Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handlePrevStage}
          disabled={isFirstStage(currentStage)}
          className="h-12 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-40"
          style={{ backgroundColor: 'var(--chult-stone-dark)' }}
        >
          Previous
        </button>
        <button
          onClick={handleNextStage}
          disabled={isLastStage(currentStage)}
          className="h-12 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-40"
          style={{ backgroundColor: 'var(--chult-teal)' }}
        >
          Next
        </button>
      </div>

      {/* Race Control */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        {!raceStarted ? (
          <button
            onClick={handleStartRace}
            className="col-span-2 h-14 text-xl font-bold rounded-lg text-white transition-all hover:brightness-110"
            style={{ backgroundColor: 'var(--chult-teal)' }}
          >
            Start Race
          </button>
        ) : (
          <>
            <button
              onClick={handleTogglePause}
              className="h-14 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110"
              style={{ backgroundColor: isPaused ? 'var(--chult-teal)' : 'var(--chult-amber)' }}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={handleResetRace}
              className="h-14 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110"
              style={{ backgroundColor: 'var(--chult-terracotta)' }}
            >
              End Race
            </button>
          </>
        )}
      </div>
    </div>
  );
};
