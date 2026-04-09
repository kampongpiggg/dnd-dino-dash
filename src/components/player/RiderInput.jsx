export const RiderInput = ({ value, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      <label className="text-lg" style={{ color: 'var(--chult-sand)' }}>Rider Name:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your character name"
        disabled={disabled}
        className="w-full h-14 text-xl px-4 border-2 rounded-lg focus:outline-none disabled:opacity-50"
        style={{
          backgroundColor: 'var(--chult-jungle)',
          borderColor: 'var(--chult-stone)',
          color: 'var(--chult-cream)',
        }}
      />
    </div>
  );
};
