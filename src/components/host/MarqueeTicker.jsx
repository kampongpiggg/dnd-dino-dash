export const MarqueeTicker = ({ message, timestamp }) => {
  if (!message) {
    return (
      <div
        className="fixed bottom-0 left-0 right-0 h-12 flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(26, 46, 26, 0.95)',
          borderTop: '2px solid var(--chult-stone)',
        }}
      >
        <span style={{ color: 'var(--chult-stone)' }}>
          Port Nyanzaru Dinosaur Racing
        </span>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-12 overflow-hidden"
      style={{
        backgroundColor: 'rgba(26, 46, 26, 0.95)',
        borderTop: '2px solid var(--chult-gold)',
      }}
    >
      <div
        key={timestamp}
        className="h-full flex items-center ticker-scroll whitespace-nowrap"
      >
        <span
          className="text-xl font-bold px-8"
          style={{ color: 'var(--chult-gold)' }}
        >
          {message}
        </span>
        <span
          className="text-xl font-bold px-8"
          style={{ color: 'var(--chult-gold)' }}
        >
          {message}
        </span>
        <span
          className="text-xl font-bold px-8"
          style={{ color: 'var(--chult-gold)' }}
        >
          {message}
        </span>
      </div>
    </div>
  );
};
