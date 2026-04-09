import { useState } from 'react';
import { updateInitiative, clearAllInitiatives } from '../../services/dinosaurService';
import { nextTurn, resetTurn } from '../../services/globalStateService';

export const InitiativeControls = ({
  dinosaurs,
  initiativeOrder,
  currentTurnIndex,
  currentTurnDino,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleInitiativeChange = async (dinoId, value) => {
    const initiative = parseInt(value, 10);
    if (!isNaN(initiative)) {
      await updateInitiative(dinoId, initiative);
    }
    setEditingId(null);
    setEditValue('');
  };

  const handleRollAll = async () => {
    for (const dino of dinosaurs) {
      // Roll d20 for initiative
      const roll = Math.floor(Math.random() * 20) + 1;
      await updateInitiative(dino.id, roll);
    }
    await resetTurn();
  };

  const handleClearAll = async () => {
    if (confirm('Clear all initiative values?')) {
      await clearAllInitiatives();
      await resetTurn();
    }
  };

  const handleNextTurn = async () => {
    if (initiativeOrder.length > 0) {
      await nextTurn(initiativeOrder.length - 1);
    }
  };

  const handleResetTurn = async () => {
    await resetTurn();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: 'var(--chult-cream)' }}>
        Initiative Tracker
      </h2>

      {/* Current Turn Display */}
      {currentTurnDino && (
        <div
          className="p-3 rounded-lg text-center"
          style={{
            backgroundColor: 'var(--chult-jungle)',
            border: '2px solid var(--chult-gold)',
          }}
        >
          <span className="text-sm" style={{ color: 'var(--chult-sand)' }}>
            Current Turn:
          </span>
          <div className="text-xl font-bold" style={{ color: currentTurnDino.color }}>
            {currentTurnDino.name}
          </div>
        </div>
      )}

      {/* Turn Controls */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleNextTurn}
          disabled={initiativeOrder.length === 0}
          className="h-12 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110 disabled:opacity-40"
          style={{ backgroundColor: 'var(--chult-teal)' }}
        >
          Next Turn
        </button>
        <button
          onClick={handleResetTurn}
          className="h-12 text-lg font-bold rounded-lg text-white transition-all hover:brightness-110"
          style={{ backgroundColor: 'var(--chult-stone-dark)' }}
        >
          Reset Turn
        </button>
      </div>

      {/* Initiative List */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm" style={{ color: 'var(--chult-sand)' }}>
            Initiative Values
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleRollAll}
              className="px-3 py-1 text-sm font-bold rounded text-white transition-all hover:brightness-110"
              style={{ backgroundColor: 'var(--chult-teal)' }}
            >
              Roll All
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1 text-sm font-bold rounded text-white transition-all hover:brightness-110"
              style={{ backgroundColor: 'var(--chult-terracotta)' }}
            >
              Clear
            </button>
          </div>
        </div>

        {dinosaurs.map((dino) => {
          const isEditing = editingId === dino.id;
          const turnIndex = initiativeOrder.findIndex((d) => d.id === dino.id);
          const isCurrentTurn = turnIndex === currentTurnIndex && turnIndex !== -1;

          return (
            <div
              key={dino.id}
              className="flex items-center gap-2 p-2 rounded-lg"
              style={{
                backgroundColor: isCurrentTurn
                  ? 'var(--chult-jungle-light)'
                  : 'var(--chult-jungle)',
                border: isCurrentTurn ? '1px solid var(--chult-gold)' : '1px solid transparent',
              }}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: dino.color }}
              />
              <span
                className="flex-1 font-bold text-sm truncate"
                style={{ color: dino.color }}
              >
                {dino.name}
              </span>
              {isEditing ? (
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleInitiativeChange(dino.id, editValue)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleInitiativeChange(dino.id, editValue);
                    }
                    if (e.key === 'Escape') {
                      setEditingId(null);
                      setEditValue('');
                    }
                  }}
                  autoFocus
                  className="w-16 h-8 text-center rounded border-2"
                  style={{
                    backgroundColor: 'var(--chult-jungle-dark)',
                    borderColor: 'var(--chult-gold)',
                    color: 'var(--chult-cream)',
                  }}
                />
              ) : (
                <button
                  onClick={() => {
                    setEditingId(dino.id);
                    setEditValue(dino.initiative?.toString() || '');
                  }}
                  className="w-16 h-8 text-center font-bold rounded transition-all hover:brightness-110"
                  style={{
                    backgroundColor: 'var(--chult-jungle-dark)',
                    color: dino.initiative !== null ? 'var(--chult-cream)' : 'var(--chult-stone)',
                  }}
                >
                  {dino.initiative !== null ? dino.initiative : '—'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
