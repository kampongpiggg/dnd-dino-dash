import { useState } from 'react';

export const DistanceInput = ({ currentTally, onAdd, onUndo, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value) && value > 0) {
      onAdd(value);
      setInputValue('');
    }
  };

  const handleUndo = () => {
    onUndo();
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <span className="text-lg" style={{ color: 'var(--chult-sand)' }}>Current Distance:</span>
        <span className="text-4xl font-bold ml-3" style={{ color: 'var(--chult-gold)' }}>{currentTally} ft</span>
      </div>

      <input
        type="number"
        inputMode="numeric"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter feet moved"
        disabled={disabled}
        className="w-full h-16 text-2xl text-center border-2 rounded-lg focus:outline-none disabled:opacity-50"
        style={{
          backgroundColor: 'var(--chult-jungle)',
          borderColor: 'var(--chult-stone)',
          color: 'var(--chult-cream)',
        }}
      />

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleAdd}
          disabled={disabled || !inputValue}
          className="h-16 text-xl font-bold disabled:opacity-50 rounded-lg text-white transition-all hover:brightness-110"
          style={{ backgroundColor: 'var(--chult-teal)' }}
        >
          + Add Distance
        </button>
        <button
          onClick={handleUndo}
          disabled={disabled}
          className="h-16 text-xl font-bold disabled:opacity-50 rounded-lg text-white transition-all hover:brightness-110"
          style={{ backgroundColor: 'var(--chult-terracotta)' }}
        >
          Undo
        </button>
      </div>
    </div>
  );
};
