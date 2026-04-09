/**
 * InjectCard - Stage-specific event cards with challenge information
 */

export const InjectCard = ({
  cardType = 'event',
  title,
  challenge,
  successText,
  description,
  onDismiss,
}) => {
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

  const style = cardStyles[cardType] || cardStyles.event;

  return (
    <div
      className="fixed top-1/4 left-1/2 transform -translate-x-1/2 z-40 p-6 rounded-xl max-w-lg w-full mx-4"
      style={{
        backgroundColor: style.bg,
        border: `3px solid ${style.border}`,
        boxShadow: '0 0 30px rgba(0,0,0,0.5)',
      }}
    >
      {/* Card Type Badge */}
      <div
        className="inline-block px-3 py-1 rounded text-xs font-bold text-white mb-3"
        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
      >
        {cardType === 'hazard' ? 'HAZARD' : 'EVENT'}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-white mb-4 italic" style={{ opacity: 0.9 }}>
          {description}
        </p>
      )}

      {/* Challenge Box */}
      {challenge && (
        <div
          className="p-3 rounded-lg mb-3"
          style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
        >
          <div className="text-sm font-bold text-white mb-1">Challenge:</div>
          <div className="text-lg font-bold" style={{ color: 'var(--chult-cream)' }}>
            {challenge}
          </div>
        </div>
      )}

      {/* Success Text */}
      {successText && (
        <div
          className="p-3 rounded-lg mb-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}
        >
          <div className="text-white font-bold">{successText}</div>
        </div>
      )}

      {/* Dismiss Button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="w-full px-4 py-3 rounded-lg font-bold text-white transition-all hover:brightness-110"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        >
          Dismiss
        </button>
      )}
    </div>
  );
};
