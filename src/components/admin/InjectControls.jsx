import { getStageInject, hasInject } from '../../config/injectContent';
import { showInjectCard, hideInjectCard } from '../../services/globalStateService';

export const InjectControls = ({ currentStage, showInject }) => {
  const inject = getStageInject(currentStage);
  const hasCurrentInject = hasInject(currentStage);

  const handleToggle = async () => {
    if (showInject) {
      await hideInjectCard();
    } else {
      await showInjectCard();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--chult-cream)' }}>
        Stage Events
      </h2>

      {hasCurrentInject ? (
        <>
          {/* Preview Card */}
          <div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: inject.cardType === 'hazard' ? 'var(--chult-terracotta)' : 'var(--chult-amber)',
              opacity: showInject ? 1 : 0.6,
            }}
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className="px-2 py-1 rounded text-xs font-bold text-white"
                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
              >
                {inject.cardType === 'hazard' ? 'HAZARD' : 'EVENT'}
              </span>
              <span
                className="text-xs font-bold"
                style={{ color: showInject ? 'var(--chult-cream)' : 'transparent' }}
              >
                LIVE
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{inject.title}</h3>
            <p className="text-sm text-white mb-2" style={{ opacity: 0.9 }}>
              {inject.challenge}
            </p>
            <p className="text-xs text-white" style={{ opacity: 0.8 }}>
              {inject.successText}
            </p>
          </div>

          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            className="w-full h-12 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110"
            style={{
              backgroundColor: showInject ? 'var(--chult-terracotta)' : 'var(--chult-teal)',
            }}
          >
            {showInject ? 'Hide Event Card' : 'Show Event Card'}
          </button>
        </>
      ) : (
        <div
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: 'var(--chult-jungle)' }}
        >
          <p style={{ color: 'var(--chult-stone)' }}>
            No event for this stage
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--chult-stone)' }}>
            Events available at stages 2-7
          </p>
        </div>
      )}
    </div>
  );
};
