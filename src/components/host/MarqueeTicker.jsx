import { useTickerRotation } from '../../hooks/useTickerRotation';

const getCategoryColor = (category) => {
  switch (category) {
    case 'LATEST NEWS': return 'var(--chult-terracotta)';
    case 'ADVERTISEMENT': return 'var(--chult-teal)';
    case 'RACE INFO': return 'var(--chult-amber)';
    case 'BROADCAST': return 'var(--chult-gold)';
    default: return 'var(--chult-gold)';
  }
};

export const MarqueeTicker = ({ adminMessage, adminTimestamp }) => {
  const { currentMessage, currentCategory } = useTickerRotation(adminMessage, adminTimestamp);

  const categoryColor = getCategoryColor(currentCategory);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-14 overflow-hidden"
      style={{
        backgroundColor: 'rgba(26, 46, 26, 0.95)',
        borderTop: '2px solid var(--chult-gold)',
      }}
    >
      <div className="h-full flex items-center">
        {/* Category Badge */}
        <div
          className="h-full px-4 flex items-center flex-shrink-0"
          style={{ backgroundColor: categoryColor }}
        >
          <span className="text-sm font-bold text-white whitespace-nowrap">
            {currentCategory}
          </span>
        </div>

        {/* Scrolling Message */}
        <div className="flex-1 overflow-hidden">
          <div
            key={currentMessage}
            className="h-full flex items-center ticker-scroll whitespace-nowrap"
          >
            <span
              className="text-lg font-bold px-6"
              style={{ color: 'var(--chult-cream)' }}
            >
              {currentMessage}
            </span>
            <span
              className="text-lg font-bold px-6"
              style={{ color: 'var(--chult-cream)' }}
            >
              {currentMessage}
            </span>
            <span
              className="text-lg font-bold px-6"
              style={{ color: 'var(--chult-cream)' }}
            >
              {currentMessage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
