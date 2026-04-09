/**
 * InjectCard - Placeholder component for stage-specific event cards
 *
 * Future use cases:
 * - Stage arrival announcements
 * - Special event notifications (Senator's arrival at Stage 7)
 * - Hazard warnings
 * - Sponsor messages
 *
 * Props:
 * - cardType: 'announcement' | 'hazard' | 'sponsor' | 'event'
 * - title: string
 * - message: string
 * - onDismiss: function
 * - autoClose: number (ms, optional)
 */

export const InjectCard = ({ cardType = 'announcement', title, message, onDismiss }) => {
  const cardStyles = {
    announcement: {
      bg: 'var(--chult-teal)',
      border: 'var(--chult-gold)',
    },
    hazard: {
      bg: 'var(--chult-terracotta)',
      border: 'var(--chult-amber)',
    },
    sponsor: {
      bg: 'var(--chult-jungle-light)',
      border: 'var(--chult-gold)',
    },
    event: {
      bg: 'var(--chult-amber)',
      border: 'var(--chult-gold)',
    },
  };

  const style = cardStyles[cardType] || cardStyles.announcement;

  return (
    <div
      className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-40 p-6 rounded-xl max-w-md w-full mx-4"
      style={{
        backgroundColor: style.bg,
        border: `3px solid ${style.border}`,
      }}
    >
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-white mb-4">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="px-4 py-2 rounded font-bold text-white transition-all hover:brightness-110"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
