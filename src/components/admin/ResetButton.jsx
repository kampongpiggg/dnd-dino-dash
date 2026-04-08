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
        <p className="text-yellow-400 text-xl text-center font-bold">
          Are you sure? This will reset ALL dinosaurs!
        </p>
      )}
      <div className="flex gap-4">
        <button
          onClick={handleReset}
          disabled={resetting}
          className={`flex-1 h-20 text-2xl font-bold rounded-lg text-white transition-colors ${
            confirming
              ? 'bg-red-600 hover:bg-red-500'
              : 'bg-orange-600 hover:bg-orange-500'
          } disabled:opacity-50`}
        >
          {resetting ? 'Resetting...' : confirming ? 'YES, RESET ALL' : 'Reset Race'}
        </button>
        {confirming && (
          <button
            onClick={handleCancel}
            className="flex-1 h-20 text-2xl font-bold bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
