export const DinoSelector = ({ dinosaurs, selectedId, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {dinosaurs.map((dino) => (
        <button
          key={dino.id}
          onClick={() => onSelect(dino.id)}
          className={`p-4 rounded-lg border-4 font-bold text-lg transition-all ${
            selectedId === dino.id
              ? 'border-white scale-105'
              : 'border-transparent opacity-70 hover:opacity-100'
          }`}
          style={{ backgroundColor: dino.color }}
        >
          <span className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {dino.name}
          </span>
          {dino.rider && (
            <span className="block text-sm mt-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              ({dino.rider})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
