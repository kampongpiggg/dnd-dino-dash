import { useEffect } from 'react';
import { useDinosaurs } from '../hooks/useDinosaurs';
import { ResetButton } from '../components/admin/ResetButton';
import { seedDinosaurs } from '../services/dinosaurService';

export const AdminView = () => {
  const { dinosaurs, loading } = useDinosaurs(false);

  const handleSeed = async () => {
    if (confirm('This will overwrite all dinosaur data. Continue?')) {
      await seedDinosaurs();
      alert('Database seeded!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">ADMIN PANEL</h1>
        <p className="text-gray-400">Race Control</p>
      </header>

      <div className="max-w-md mx-auto space-y-8">
        <ResetButton />

        <div className="border-t border-gray-700 pt-8">
          <h2 className="text-xl font-bold text-white mb-4">Database Tools</h2>
          <button
            onClick={handleSeed}
            className="w-full h-14 text-lg font-bold bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors"
          >
            Seed/Reset Database
          </button>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Use this if the database is empty or corrupted
          </p>
        </div>

        {!loading && dinosaurs.length > 0 && (
          <div className="border-t border-gray-700 pt-8">
            <h2 className="text-xl font-bold text-white mb-4">Current State</h2>
            <div className="space-y-2">
              {dinosaurs.map((dino) => (
                <div
                  key={dino.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-gray-800"
                >
                  <span className="font-bold" style={{ color: dino.color }}>
                    {dino.name}
                  </span>
                  <span className="text-white">
                    {dino.tally}ft · {dino.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
