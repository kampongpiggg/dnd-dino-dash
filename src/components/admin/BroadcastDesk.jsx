import { useState } from 'react';
import { sendTickerMessage, clearTicker, setTickerSpeed } from '../../services/globalStateService';

const PRESET_MESSAGES = [
  { label: 'Lead Change', message: 'LEAD CHANGE! The race heats up!' },
  { label: 'Sabotage', message: 'SABOTAGE! Foul play on the track!' },
  { label: 'Berserk', message: 'BERSERK! A dinosaur has gone out of control!' },
  { label: 'Crowd Roar', message: 'The crowd goes WILD!' },
];

const SPEED_PRESETS = [
  { label: 'Slow', value: 80 },
  { label: 'Normal', value: 160 },
  { label: 'Fast', value: 280 },
];

export const BroadcastDesk = ({ currentMessage, tickerSpeed = 160 }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSpeedChange = async (speed) => {
    await setTickerSpeed(speed);
  };

  const handleBroadcast = async () => {
    if (inputValue.trim()) {
      await sendTickerMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handlePreset = async (message) => {
    await sendTickerMessage(message);
  };

  const handleClear = async () => {
    await clearTicker();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--chult-cream)' }}>
        Broadcast Desk
      </h2>

      {/* Current Message Display */}
      {currentMessage && (
        <div
          className="p-3 rounded-lg"
          style={{
            backgroundColor: 'var(--chult-jungle)',
            border: '1px solid var(--chult-gold)',
          }}
        >
          <span className="text-xs" style={{ color: 'var(--chult-sand)' }}>
            Now Broadcasting:
          </span>
          <div className="font-bold truncate" style={{ color: 'var(--chult-gold)' }}>
            {currentMessage}
          </div>
        </div>
      )}

      {/* Custom Message Input */}
      <div className="space-y-2">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter custom ticker message..."
          maxLength={120}
          rows={2}
          className="w-full p-3 rounded-lg border-2 resize-none"
          style={{
            backgroundColor: 'var(--chult-jungle)',
            borderColor: 'var(--chult-stone)',
            color: 'var(--chult-cream)',
          }}
        />
        <div className="flex justify-between items-center">
          <span className="text-xs" style={{ color: 'var(--chult-stone)' }}>
            {inputValue.length}/120
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm font-bold rounded text-white transition-all hover:brightness-110"
              style={{ backgroundColor: 'var(--chult-stone-dark)' }}
            >
              Clear
            </button>
            <button
              onClick={handleBroadcast}
              disabled={!inputValue.trim()}
              className="px-4 py-2 text-sm font-bold rounded text-white transition-all hover:brightness-110 disabled:opacity-40"
              style={{ backgroundColor: 'var(--chult-teal)' }}
            >
              Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Preset Messages */}
      <div className="space-y-2">
        <span className="text-sm" style={{ color: 'var(--chult-sand)' }}>
          Quick Messages
        </span>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_MESSAGES.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handlePreset(preset.message)}
              className="px-3 py-2 text-sm font-bold rounded text-white transition-all hover:brightness-110 truncate"
              style={{ backgroundColor: 'var(--chult-jungle-light)' }}
              title={preset.message}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ticker Speed */}
      <div className="space-y-2">
        <span className="text-sm" style={{ color: 'var(--chult-sand)' }}>
          Scroll Speed
        </span>
        <div className="grid grid-cols-3 gap-2">
          {SPEED_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handleSpeedChange(preset.value)}
              className="px-3 py-2 text-sm font-bold rounded text-white transition-all hover:brightness-110"
              style={{
                backgroundColor: tickerSpeed === preset.value
                  ? 'var(--chult-teal)'
                  : 'var(--chult-stone-dark)',
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-center" style={{ color: 'var(--chult-stone)' }}>
          {tickerSpeed} px/sec
        </p>
      </div>
    </div>
  );
};
