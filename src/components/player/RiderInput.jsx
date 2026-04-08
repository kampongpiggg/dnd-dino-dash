export const RiderInput = ({ value, onChange, disabled }) => {
  return (
    <div className="space-y-2">
      <label className="text-gray-400 text-lg">Rider Name:</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your character name"
        disabled={disabled}
        className="w-full h-14 text-xl px-4 bg-gray-800 border-2 border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none disabled:opacity-50"
      />
    </div>
  );
};
