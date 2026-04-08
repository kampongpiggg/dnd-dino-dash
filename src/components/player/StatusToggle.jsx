const STATUSES = ['Active', 'Prone', 'Out'];

export const StatusToggle = ({ currentStatus, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      <label className="text-gray-400 text-lg">Status:</label>
      <div className="grid grid-cols-3 gap-3">
        {STATUSES.map((status) => {
          const isActive = currentStatus === status;
          let bgColor = 'bg-gray-700';
          if (isActive) {
            if (status === 'Active') bgColor = 'bg-green-600';
            if (status === 'Prone') bgColor = 'bg-yellow-600';
            if (status === 'Out') bgColor = 'bg-red-600';
          }

          return (
            <button
              key={status}
              onClick={() => onChange(status)}
              disabled={disabled}
              className={`h-14 text-lg font-bold rounded-lg text-white transition-all ${bgColor} ${
                isActive ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
              } disabled:opacity-40`}
            >
              {status}
            </button>
          );
        })}
      </div>
    </div>
  );
};
