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
        <span className="text-gray-400 text-lg">Current Distance:</span>
        <span className="text-4xl font-bold text-white ml-3">{currentTally} ft</span>
      </div>

      <input
        type="number"
        inputMode="numeric"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter feet moved"
        disabled={disabled}
        className="w-full h-16 text-2xl text-center bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none disabled:opacity-50"
      />

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleAdd}
          disabled={disabled || !inputValue}
          className="h-16 text-xl font-bold bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:opacity-50 rounded-lg text-white transition-colors"
        >
          + Add Distance
        </button>
        <button
          onClick={handleUndo}
          disabled={disabled}
          className="h-16 text-xl font-bold bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:opacity-50 rounded-lg text-white transition-colors"
        >
          Undo
        </button>
      </div>
    </div>
  );
};
