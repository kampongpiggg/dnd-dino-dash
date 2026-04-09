import { useMemo, useState, useEffect, useRef } from 'react';
import { TICKER_CONTENT, TICKER_CATEGORIES, getCategoryLabel } from '../../config/tickerContent';

const DEFAULT_SCROLL_SPEED = 160; // pixels per second

const getCategoryColor = (category) => {
  switch (category) {
    case 'news': return 'var(--chult-terracotta)';
    case 'ads': return 'var(--chult-teal)';
    case 'race': return 'var(--chult-amber)';
    case 'broadcast': return 'var(--chult-gold)';
    default: return 'var(--chult-gold)';
  }
};

const TickerBadge = ({ category }) => (
  <span
    className="inline-flex items-center px-3 py-1 rounded text-xs font-bold text-white mx-4"
    style={{ backgroundColor: getCategoryColor(category) }}
  >
    {getCategoryLabel(category)}
  </span>
);

const TickerMessage = ({ children }) => (
  <span
    className="text-lg font-bold mx-2"
    style={{ color: 'var(--chult-cream)' }}
  >
    {children}
  </span>
);

const Separator = () => (
  <span className="mx-4" style={{ color: 'var(--chult-stone)' }}>
    ★
  </span>
);

export const MarqueeTicker = ({ adminMessage, adminTimestamp, tickerSpeed = DEFAULT_SCROLL_SPEED }) => {
  const [adminMessages, setAdminMessages] = useState([]);
  const lastTimestampRef = useRef(0);

  // Track admin messages
  useEffect(() => {
    if (adminMessage && adminTimestamp > lastTimestampRef.current) {
      setAdminMessages(prev => [...prev, adminMessage]);
      lastTimestampRef.current = adminTimestamp;
    }
  }, [adminMessage, adminTimestamp]);

  // Build the full ticker content
  const tickerContent = useMemo(() => {
    const items = [];

    TICKER_CATEGORIES.forEach((category, catIndex) => {
      const messages = TICKER_CONTENT[category];

      // Add category badge before first message of category
      items.push(
        <TickerBadge key={`badge-${category}`} category={category} />
      );

      messages.forEach((msg, msgIndex) => {
        items.push(
          <TickerMessage key={`${category}-${msgIndex}`}>
            {msg}
          </TickerMessage>
        );

        // Add separator between messages (not after last in category)
        if (msgIndex < messages.length - 1) {
          items.push(
            <Separator key={`sep-${category}-${msgIndex}`} />
          );
        }
      });

      // Insert admin messages after each category rotation
      if (adminMessages.length > 0 && catIndex === TICKER_CATEGORIES.length - 1) {
        items.push(
          <TickerBadge key="badge-broadcast" category="broadcast" />
        );
        adminMessages.forEach((msg, idx) => {
          items.push(
            <TickerMessage key={`admin-${idx}`}>
              {msg}
            </TickerMessage>
          );
          if (idx < adminMessages.length - 1) {
            items.push(
              <Separator key={`sep-admin-${idx}`} />
            );
          }
        });
      }

      // Add separator between categories
      if (catIndex < TICKER_CATEGORIES.length - 1 || adminMessages.length > 0) {
        items.push(
          <Separator key={`cat-sep-${catIndex}`} />
        );
      }
    });

    return items;
  }, [adminMessages]);

  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  // Measure actual content width
  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [tickerContent]);

  // Calculate duration: width / speed
  const scrollSpeed = tickerSpeed > 0 ? tickerSpeed : DEFAULT_SCROLL_SPEED;
  const animationDuration = contentWidth > 0 ? contentWidth / scrollSpeed : 60;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-14 overflow-hidden"
      style={{
        backgroundColor: 'rgba(26, 46, 26, 0.95)',
        borderTop: '2px solid var(--chult-gold)',
      }}
    >
      <div
        className="h-full flex items-center whitespace-nowrap ticker-scroll-dynamic"
        style={{
          '--scroll-distance': `-${contentWidth}px`,
          animationDuration: `${animationDuration}s`,
        }}
      >
        {/* First copy - used for width measurement */}
        <div ref={contentRef} className="flex items-center flex-shrink-0">
          {tickerContent}
          <span className="mx-8" />
        </div>
        {/* Second copy for seamless loop */}
        <div className="flex items-center flex-shrink-0">
          {tickerContent}
          <span className="mx-8" />
        </div>
      </div>
    </div>
  );
};
