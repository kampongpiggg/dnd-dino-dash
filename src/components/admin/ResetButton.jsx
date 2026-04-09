import { useState } from 'react';
import { resetAll } from '../../services/dinosaurService';

export const ResetButton = () => {
  const [confirming, setConfirming] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleReset = async () => {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setResetting(true);
    try {
      await resetAll();
      setConfirming(false);
    } catch (error) {
      console.error('Reset failed:', error);
      alert('Failed to reset. Check console for details.');
    } finally {
      setResetting(false);
    }
  };

  const handleCancel = () => {
    setConfirming(false);
  };

  return (
    <div className="space-y-4">
      {confirming && (
        <p className="text-xl text-center font-bold" style={{ color: 'var(--chult-gold)' }}>
          Are you sure? This will reset ALL dinosaurs!
        </p>
      )}
      <div className="flex gap-4">
        <button
          onClick={handleReset}
          disabled={resetting}
          className="flex-1 h-20 text-2xl font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-50"
          style={{ backgroundColor: confirming ? 'var(--chult-terracotta)' : 'var(--chult-amber)' }}
        >
          {resetting ? 'Resetting...' : confirming ? 'YES, RESET ALL' : 'Reset Race'}
        </button>
        {confirming && (
          <button
            onClick={handleCancel}
            className="flex-1 h-20 text-2xl font-bold rounded-lg text-white transition-all hover:brightness-110"
            style={{ backgroundColor: 'var(--chult-stone-dark)' }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
