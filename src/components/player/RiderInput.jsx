import { useState } from 'react';

export const RiderInput = ({ value, onChange, disabled }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleConfirm = () => {
    if (localValue.trim()) {
      onChange(localValue.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <div className="space-y-3">
      <label className="text-lg" style={{ color: 'var(--chult-sand)' }}>Rider Name:</label>
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your character name"
        disabled={disabled}
        className="w-full h-14 text-xl px-4 border-2 rounded-lg focus:outline-none disabled:opacity-50"
        style={{
          backgroundColor: 'var(--chult-jungle)',
          borderColor: 'var(--chult-stone)',
          color: 'var(--chult-cream)',
        }}
      />
      <button
        onClick={handleConfirm}
        disabled={disabled || !localValue.trim()}
        className="w-full h-12 text-lg font-bold rounded-lg text-white transition-all disabled:opacity-40"
        style={{ backgroundColor: 'var(--chult-gold)' }}
      >
        Confirm
      </button>
    </div>
  );
};
