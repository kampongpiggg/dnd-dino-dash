const STATUSES = ['Active', 'Prone', 'Out'];

const getStatusStyle = (status, isActive) => {
  if (!isActive) return { backgroundColor: 'var(--chult-stone-dark)' };
  if (status === 'Active') return { backgroundColor: 'var(--chult-teal)' };
  if (status === 'Prone') return { backgroundColor: 'var(--chult-amber)' };
  if (status === 'Out') return { backgroundColor: 'var(--chult-terracotta)' };
  return {};
};

export const StatusToggle = ({ currentStatus, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      <label className="text-lg" style={{ color: 'var(--chult-sand)' }}>Status:</label>
      <div className="grid grid-cols-3 gap-3">
        {STATUSES.map((status) => {
          const isActive = currentStatus === status;

          return (
            <button
              key={status}
              onClick={() => onChange(status)}
              disabled={disabled}
              className={`h-14 text-lg font-bold rounded-lg text-white transition-all ${
                isActive ? 'ring-2' : 'opacity-60 hover:opacity-100'
              } disabled:opacity-40`}
              style={{
                ...getStatusStyle(status, isActive),
                '--tw-ring-color': isActive ? 'var(--chult-gold)' : undefined,
              }}
            >
              {status}
            </button>
          );
        })}
      </div>
    </div>
  );
};
