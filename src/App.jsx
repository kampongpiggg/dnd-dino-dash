import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { HostView } from './pages/HostView';
import { PlayerView } from './pages/PlayerView';
import { AdminView } from './pages/AdminView';

const HomePage = () => (
  <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl font-bold text-white mb-2">DINO-DASH</h1>
    <p className="text-gray-400 mb-8">Dinosaur Race Tracker</p>

    <div className="space-y-4 w-full max-w-xs">
      <Link
        to="/host"
        className="block w-full py-4 text-center text-xl font-bold bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
      >
        Host View (TV)
      </Link>
      <Link
        to="/play"
        className="block w-full py-4 text-center text-xl font-bold bg-green-600 hover:bg-green-500 rounded-lg text-white transition-colors"
      >
        Player View (Phone)
      </Link>
      <Link
        to="/admin"
        className="block w-full py-4 text-center text-xl font-bold bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
      >
        Admin Panel
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/host" element={<HostView />} />
        <Route path="/play" element={<PlayerView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
