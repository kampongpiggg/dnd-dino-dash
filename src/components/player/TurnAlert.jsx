import { useState, useEffect } from 'react';

export const TurnAlert = ({ isYourTurn, dinoName, dinoColor }) => {
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissed state when turn changes
  useEffect(() => {
    if (isYourTurn) {
      setDismissed(false);
    }
  }, [isYourTurn]);

  if (!isYourTurn || dismissed) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={() => setDismissed(true)}
    >
      <div
        className="p-8 rounded-2xl text-center max-w-sm w-full initiative-active"
        style={{
          backgroundColor: 'var(--chult-jungle-dark)',
          border: '4px solid var(--chult-gold)',
        }}
      >
        <div
          className="text-4xl font-bold mb-4"
          style={{ color: 'var(--chult-gold)' }}
        >
          YOUR TURN!
        </div>
        <div
          className="text-2xl font-bold mb-6"
          style={{ color: dinoColor }}
        >
          {dinoName}
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--chult-sand)' }}>
          Roll your dice and enter your movement!
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="px-6 py-3 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110"
          style={{ backgroundColor: 'var(--chult-teal)' }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
