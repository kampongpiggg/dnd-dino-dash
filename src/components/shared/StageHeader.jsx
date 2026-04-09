import { TOTAL_STAGES } from '../../config/stages';

export const StageHeader = ({ stageName, stageNumber, isPaused }) => {
  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full border-2"
      style={{
        backgroundColor: 'rgba(26, 46, 26, 0.8)',
        borderColor: 'var(--chult-gold)',
      }}
    >
      <span
        className="text-sm font-bold"
        style={{ color: 'var(--chult-sand)' }}
      >
        Stage {stageNumber + 1}/{TOTAL_STAGES}:
      </span>
      <span
        className="text-lg font-bold"
        style={{ color: 'var(--chult-gold)' }}
      >
        {stageName}
      </span>
      {isPaused && (
        <span
          className="px-2 py-0.5 rounded text-xs font-bold"
          style={{
            backgroundColor: 'var(--chult-amber)',
            color: 'white',
          }}
        >
          PAUSED
        </span>
      )}
    </div>
  );
};
