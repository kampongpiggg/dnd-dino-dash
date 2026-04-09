export const InitiativeSidebar = ({ initiativeOrder, currentTurnIndex }) => {
  if (!initiativeOrder || initiativeOrder.length === 0) {
    return (
      <div
        className="h-full flex items-center justify-center p-4 rounded-lg"
        style={{ backgroundColor: 'var(--chult-jungle)' }}
      >
        <p className="text-center" style={{ color: 'var(--chult-sand)' }}>
          Waiting for initiative...
        </p>
      </div>
    );
  }

  return (
    <div
      className="h-full p-4 rounded-lg overflow-y-auto"
      style={{ backgroundColor: 'var(--chult-jungle)' }}
    >
      <h3
        className="text-lg font-bold mb-4 text-center"
        style={{ color: 'var(--chult-gold)' }}
      >
        Turn Order
      </h3>
      <div className="space-y-2">
        {initiativeOrder.map((dino, index) => {
          const isCurrentTurn = index === currentTurnIndex;
          return (
            <div
              key={dino.id}
              className={`p-3 rounded-lg transition-all ${isCurrentTurn ? 'initiative-active' : ''}`}
              style={{
                backgroundColor: isCurrentTurn
                  ? 'var(--chult-jungle-dark)'
                  : 'transparent',
                border: isCurrentTurn
                  ? '2px solid var(--chult-gold)'
                  : '2px solid transparent',
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dino.color }}
                />
                <div className="flex-1 min-w-0">
                  <div
                    className="font-bold text-sm truncate"
                    style={{ color: dino.color }}
                  >
                    {dino.name}
                  </div>
                  {dino.rider && (
                    <div
                      className="text-xs truncate"
                      style={{ color: 'var(--chult-sand)' }}
                    >
                      {dino.rider}
                    </div>
                  )}
                </div>
                <div
                  className="text-sm font-bold flex-shrink-0"
                  style={{ color: 'var(--chult-cream)' }}
                >
                  {dino.initiative}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
